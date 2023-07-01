require('dotenv').config()
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@studentcentral.mci0sqm.mongodb.net/all_users?retryWrites=true&w=majority`;
const express = require("express");
const app = express();
app.use(express.json())
const mongoose = require("mongoose");
const {Schema} = mongoose;

const dbConnect = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.log("ERROR CONNECTING TO MONGODB"))
}

dbConnect();

mongoose.connection.on("open", () => {
    console.log("CONNECTED TO MONGODB");
})

const usersSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    username: String,
    pass: String
});
const Users = mongoose.model("Users", usersSchema);

app.get('/find', async (req, res) => {
    const a_user = await Users.find();
    console.log(a_user);
    res.send(a_user);
})
// app.get('/find', (req, res) => {
//     res.send('<p>pls work</p>')
// })

app.listen(3001, () => console.log("Server started on port 3001"));