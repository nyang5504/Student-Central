const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');


//MongoDB port
const app = express();
const port = 4000;
app.use(cors());

// Parse JSON for this app
app.use(express.json());

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
    const collection = db.collection('users');
    
    // Endpoint for registration
    app.post('/api/register', async (req, res) => {
      const { username, password } = req.body;

      // Validate the data
      if (!username || !password) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      try {
        // Check if the user exists
        const existingUser = await collection.findOne({ username });
        if (existingUser) {
          return res.status(409).json({ error: 'Username is taken' });
        }

        // Password hash for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to the database
        const newUser = { username, password: hashedPassword };
        await collection.insertOne(newUser);

        res.status(201).json({ message: 'Registration successful.' });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user.' });
      }
    });

    // Endpoint for login
    app.post('/api/login', async (req, res) => {
      const { username, password } = req.body;

      // Validate the data
      if (!username || !password) {
        return res.status(400).json({ error: 'Please provide both username and password.' });
      }

      try {
        // Find user in datbase
        const user = await collection.findOne({ username });
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Verify the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Authentication successful
        res.status(200).json({ message: 'Login successful.' });
      } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to log in.' });
      }
    });

    // Server success or error
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
