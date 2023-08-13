require('dotenv').config()
// console.log(process.env.USER)
const username = process.env.USER;
const password = process.env.PASSWORD;
const key = process.env.KEY;
const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const path = require('path');

//MongoDB port
const app = express();
const port = process.env.PORT || 4000;

//Cors for security
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Parses JSON file
app.use(express.json());

// Parses cookies
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client/build')));

// MongoDB url and password
const uri = `mongodb+srv://${username}:${password}@studentcentral.mci0sqm.mongodb.net/`;
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
    const collection = db.collection('calendars');
    const todoCollection = db.collection('todolist');
    const quizCollection = db.collection('quizzes');

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
        const token = jwt.sign({ username }, key);

        // Create cookie and set the token. httpOnly and sameSite is for security
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict', expires: 0 });

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
        const { username } = jwt.verify(token, key);
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

    // Endpoint for changing password
    app.post('/api/change-password', async (req, res) => {
      // Get variables from Profile.js 
      const { username, password, newPassword } = req.body;

      try {
        // Find the user in the database
        const user = await userCollection.findOne({ username });

        // Check to see if the current password matches the input
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid current password.' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Set and update the password for the user in the database
        await userCollection.updateOne({ username }, { $set: { password: hashedNewPassword } });

        res.status(200).json({ message: 'Password changed successfully.' });
      } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Failed to change password.' });
      }
    });

    // Endpoint for sign-out
    app.post('/api/sign-out', (req, res) => {
      // Deletes cookie
      res.clearCookie('token');
      // Send success response
      res.status(200).json({ message: 'User signed out.' });
    });

    //Endpoint to save events to database
    app.post('/api/schedule/save-events', async (req, res) => {
      const events = req.body;

      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: 'Token doesn not exist' });
      }

      const { username } = jwt.verify(token, key);
      const user = await userCollection.findOne({ username });
      //console.log(user);

      try {
        const hasEvents = await collection.findOne({ username: user.username });
        if (hasEvents) {
          await collection.updateOne(hasEvents,
            { $set: { eventsList: events } });
        }
        else {
          await collection.insertOne({
            username: user.username,
            eventsList: events
          });
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
    app.get('/api/schedule/my-events', async (req, res) => {
      const token = req.cookies.token;
      //console.log("token",token);
      if (!token) {
        return res.status(401).json({ error: 'Token doesn not exist' });
      }

      const { username } = jwt.verify(token, key);
      const user = await userCollection.findOne({ username });
      //console.log(user);

      try {
        //find events
        const my_events = await collection.findOne({ username: user.username });
        if (my_events) {
          // console.log('myevents: ', my_events);
          res.json(my_events.eventsList);
        }
        else {
          //console.log("returned no events");
          res.json([]);
        }

      } catch (error) {
        res.status(500).json({ error: "get events error" });
      }
    })

    app.post('/api/schedule/save-folders', async (req, res) => {
      const body = req.body;
      // const folder = req.body.folder;
      // const folderitem = req.body.folderitem;
      // const notes = req.body.notes;

      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: 'Token doesn not exist' });
      }

      const { username } = jwt.verify(token, key);
      const user = await userCollection.findOne({ username });
      //console.log(user);

      try {
        const hasfolder = await todoCollection.findOne(
          { username: user.username },
        );
        if (hasfolder) {
          await todoCollection.updateOne(hasfolder,
            {
              $set: { folderNotes: body }
            });
        }
        else {
          await todoCollection.insertOne({
            username: user.username,
            folderNotes: body
          });
        }

      } catch (error) {
        res.status(500).json({ error: 'failed to save correctly' });
      }
    })
    //get all folders of the user
    app.get('/api/schedule/my-folders', async (req, res) => {
      const token = req.cookies.token;
      //console.log("token",token);
      if (!token) {
        return res.status(401).json({ error: 'Token doesn not exist' });
      }

      const { username } = jwt.verify(token, key);
      const user = await userCollection.findOne({ username });
      //console.log(user);

      try {
        //find events
        const my_folders = await todoCollection.findOne({ username: user.username });
        if (my_folders) {
          //console.log('myfolders: ', my_folders);
          res.json(my_folders.folderNotes);
        }
        else {
          //console.log("returned no folders");
          res.json({});
        }

      } catch (error) {
        //console.log("ERROR my-folders", error);
        res.status(500).json({ error: "get folders error" });
      }
    })

    app.post('/api/quiz/save-quiz', async (req, res) => {
      const body = req.body;
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: 'Token doesn not exist' });
      }

      const { username } = jwt.verify(token, key);
      const user = await userCollection.findOne({ username });
      //console.log(user);

      try {
        const hasfolder = await quizCollection.findOne(
          { username: user.username }
        );
        if (hasfolder) {
          await quizCollection.updateOne(hasfolder,
            {
              $set: { quizList: body }
            });
        }
        else {
          await quizCollection.insertOne({
            username: user.username,
            quizList: body
          });
        }

      } catch (error) {
        res.status(500).json({ error: 'failed to save correctly' });
      }
    })

    app.get('/api/quiz/my-quizzes', async (req, res) => {
      const token = req.cookies.token;
      //console.log("token",token);
      if (!token) {
        return res.status(401).json({ error: 'Token doesn not exist' });
      }

      const { username } = jwt.verify(token, key);
      const user = await userCollection.findOne({ username });
      //console.log(user);

      try {
        //find events
        const my_quizzes = await quizCollection.findOne({ username: user.username });
        if (my_quizzes) {
          //console.log('myfolders: ', my_quizzes);
          res.json(my_quizzes.quizList);
        }
        else {
          //console.log("returned no quizzes");
          res.json({});
        }

      } catch (error) {
        //console.log("ERROR my-quizzes", error);
        res.status(500).json({ error: "get quizzes error" });
      }
    })

    // Delete Quiz Endpoint
    app.delete('/api/quiz/delete-quiz/:quizName', async (req, res) => {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: 'Token does not exist' });
      }
      const { username } = jwt.verify(token, key);
      const quizName = req.params.quizName;
      const user = await userCollection.findOne({ username });
      try {
        // Find the user's quizzes
        const userDocument = await quizCollection.findOne({ username: user.username });
        //console.log('userDocument:', userDocument);
        if (!userDocument) {
          return res.status(404).json({ error: 'User not found' });
        }
        // Find the quiz list for the user
        const quizList = userDocument.quizList; // Access the quizList directly
        //console.log('Quiz List:', quizList);
        if (!quizList) {
          return res.status(404).json({ error: 'Quiz list not found for the user' });
        }
        // Check if the quiz exists in the quizList
        if (!(quizName in quizList)) {
          return res.status(404).json({ error: 'Quiz not found' });
        }
        // Remove the quiz from the quizList object
        delete quizList[quizName];
        // Update the user document with the modified quizList
        await quizCollection.updateOne(
          { username: user.username },
          { $set: { quizList } }
        );
        res.status(200).json({ message: 'Quiz deleted successfully' });
      } catch (error) {
        console.log('Error deleting quiz:', error);
        res.status(500).json({ error: 'Failed to delete the quiz' });
      }
    });

    // Edit Quiz Endpoint
    app.put('/api/quiz/edit-quiz/:quizName', async (req, res) => {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: 'Token does not exist' });
      }

      const { username } = jwt.verify(token, key);
      const quizName = req.params.quizName;
      try {
        // Find the user document using the username
        const userDocument = await quizCollection.findOne({ 'username': username });
        if (!userDocument) {
          return res.status(404).json({ error: 'User not found' });
        }
        // Find the quiz data based on the quizName
        const quizData = userDocument.quizList[quizName];
        if (!quizData) {
          return res.status(404).json({ error: 'Quiz not found' });
        }
        // Update the quiz data with the changes made by the user in req.body
        const updatedQuizData = req.body;
        // Update the quiz data in the userDocument.quizList under the correct quizName
        userDocument.quizList[quizName].questions = updatedQuizData.questions;
        userDocument.quizList[quizName].publicize = updatedQuizData.publicize;
        // Update the user document with the modified quizList
        await quizCollection.updateOne(
          { _id: userDocument._id },
          { $set: { quizList: userDocument.quizList } }
        );
        res.status(200).json({ message: 'Quiz updated successfully' });
      } catch (error) {
        console.log('Error updating quiz:', error);
        res.status(500).json({ error: 'Failed to update the quiz' });
      }
    });

    // Endpoint for retrieving a single quiz from a user
    app.get('/api/quiz/get-one-quiz/:quizName', async (req, res) => {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: 'Token does not exist' });
      }
      const { username } = jwt.verify(token, key);
      const quizName = req.params.quizName;
      const user = await userCollection.findOne({ username });
      try {
        // Find the document for the user
        const userDocument = await quizCollection.findOne({ username: user.username });
        if (!userDocument) {
          return res.status(404).json({ error: 'User not found' });
        }
        // Find the quiz from the quiz list based on the quizName
        const quizData = userDocument.quizList[quizName];
        if (!quizData) {
          return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(quizData);
      } catch (error) {
        console.log('Error fetching quiz data:', error);
        res.status(500).json({ error: 'Failed to fetch quiz data' });
      }
    });

    app.get('/api/quiz/one-quiz-from-all/:quizName/:user', async (req, res) => {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: 'Token does not exist' });
      }
      // const { username } = jwt.verify(token, key);
      const quizName = req.params.quizName;
      const quizMaker = req.params.user;
      // const user = await userCollection.findOne({ username });
      try {
        // Find the document for the user
        const userDocument = await quizCollection.findOne({ username: quizMaker });
        if (!userDocument) {
          return res.status(404).json({ error: 'User not found' });
        }
        // Find the quiz from the quiz list based on the quizName
        const quizData = userDocument.quizList[quizName].questions;
        if (!quizData || userDocument.quizList[quizName].publicize === false) {
          return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(quizData);
      } catch (error) {
        console.log('Error fetching quiz data:', error);
        res.status(500).json({ error: 'Failed to fetch quiz data' });
      }
    });

    app.get('/api/quiz/all-quizzes', async (req, res) => {
      try {
        const allUsers = await quizCollection.find({}).toArray();
        if (!allUsers) {
          return res.status(404).json({ error: 'No quizzes found' });
        }

        // Create an object to store quizzes by category
        const allQuizzes = {};

        allUsers.forEach((user) => {
          Object.keys(user.quizList).forEach((name) => {
            if (!allQuizzes[user.username]) {
              allQuizzes[user.username] = [];
            }
            if (user.quizList[name].publicize === true) {
              allQuizzes[user.username].push(name);
            }
          });
        });

        console.log(allQuizzes);
        res.status(200).json(allQuizzes);
      } catch (error) {
        console.log('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Failed to fetch quizzes' });
      }
    });

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/student-central/build/index.html'));
    });

    // Server success or error
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
