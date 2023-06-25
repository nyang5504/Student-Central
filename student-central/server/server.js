require('dotenv').config()
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@studentcentral.mci0sqm.mongodb.net/?retryWrites=true&w=majority`;
const express = require("express");
const app = express();
const mongoose = require("mongoose");


const dbConnect = () => {
    mongoose.connect(MONGO_URI).catch(error => console.log("ERROR CONNECTING TO MONGODB"))
}

dbConnect();

mongoose.connection.on("open", () => {
    console.log("CONNECTED TO MONGODB");
})
app.listen(3001, () => console.log("Server started on port 3001"));