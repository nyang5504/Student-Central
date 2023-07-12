const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');


//MongoDB port
const app = express();
const port = 4000;

app.use(cors());
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
    const collection = db.collection('calendars');
    
 
    
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

    //Endpoint to save events to database
    app.post('/schedule/save-events', async (req, res) => {
      const events = req.body;
      try{
        const hasEvents = await collection.findOne({});
        if(hasEvents){
          await collection.updateOne({},
            { $set: {eventsList: events}});
        }
        else{
          await collection.insertOne({eventsList: events});
        }
        
      } catch (error) {
        res.status(500).json({ error: 'failed to save correctly' });
      }
      // try{
      //   await collection.deleteMany({});
      // } catch(error) {
      //   console.log("not deleted");
      // }
    })

    //Endpoint to get events from database
    app.get('/schedule/my-events', async (req, res) =>{
      try{
        const my_events = await collection.findOne({});
        if(my_events){
          console.log('myevents: ', my_events);
          res.json(my_events.eventsList);
        }
        else{
          console.log("returned no events");
          res.json([]);
        }
        
      } catch(error){
        res.status(500).json({ error: "get events error" });
      }
    })

    // Server success or error
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
