const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


//MongoDB port
const app = express();
const port = 4000;

//Cors for security
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Parses JSON file
app.use(express.json());

// Parses cookies
app.use(cookieParser());

// MongoDB url and password
const uri = 'mongodb+srv://User1:98k4dV1crHfXzpg3@studentcentral.mci0sqm.mongodb.net/';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// MongoDB connected
MongoClient.connect(uri, options)
  .then((client) => {
    console.log('Connected to MongoDB!');
    const db = client.db('all_users');
    const userCollection = db.collection('users');

    // Endpoint for registration
    app.post('/api/register', async (req, res) => {
      const { username, password } = req.body;

      // checks if username or password is valid, if not send Client error response
      if (!username || !password) {
        return res.status(400).json({ error: 'Bad username or password' });
      }

      try {
        // Check if the user exists, if not, send client error response
        const existingUser = await userCollection.findOne({ username });
        if (existingUser) {
          return res.status(409).json({ error: 'Username is taken' });
        }

        // Password hash using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the username and password to collection
        const newUser = { username, password: hashedPassword };
        await userCollection.insertOne(newUser);

        //Send succesful response
        res.status(201).json({ message: 'Registration was a success' });
      } catch (error) {
        console.error('Error registering', error);
        //Send Server error response
        res.status(500).json({ error: 'Could not register' });
      }
    });

    // Endpoint for login
    app.post('/api/login', async (req, res) => {
      const { username, password } = req.body;

      // Checks if username or password is inputted, if not send client error response
      if (!username || !password) {
        return res.status(400).json({ error: 'Enter username and password again' });
      }

      try {
        // Find the user in the collection
        const user = await userCollection.findOne({ username });
        //Checks if user exist, if not send client error response
        if (!user) {
          return res.status(401).json({ error: 'Could not find user' });
        }

        // Check if passwords is good by comparing using bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid password' });
        }

        // Create a token based on username and key, key will be randomized later
        const token = jwt.sign({ username }, '1234');

        // Create cookie and set the token. httpOnly and sameSite is for security
        res.cookie('token', token, {httpOnly: true,sameSite: 'strict',});

        // Send successful response
        res.status(200).json({ message: 'Login was a success' });
      } catch (error) {
        console.error('Login error', error);
        res.status(500).json({ error: 'Could not login' });
      }
    });

    // Endpoint for profile
    app.get('/api/profile', async (req, res) => {
      // Request token from the client 
      const token = req.cookies.token;

      //Checks if token exist, if not send client error response
      if (!token) {
        return res.status(401).json({ error: 'Token doesn not exist' });
      }

      try {
        //Verifies the token and finds the user it belongs to in the collection
        const { username } = jwt.verify(token, '1234');
        const user = await userCollection.findOne({ username });
        //If user does not exist, send client error response
        if (!user) {
          return res.status(404).json({ error: 'User does not exist' });
        }
        //Send the data as JSON response
        res.json(user);
      } catch (error) {
        console.error('Bad token', error);
        res.status(401).json({ error: 'Token does not exist' });
      }
    });

    // Endpoint for sign-out
    app.post('/api/sign-out', (req, res) => {
      // Deletes cookie
      res.clearCookie('token');
      // Send success response
      res.status(200).json({ message: 'User signed out.' });
    });

    // Server success or error
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
