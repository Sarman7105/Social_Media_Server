const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');
const helmet = require('helmet');
const userRoute = require("./routes/users");



const app = express();
dotenv.config();
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0q0ko.mongodb.net/${process.env
    .DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
   
    console.log("connected to mongodb!");
    });

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);

app.listen(5000., () => {
    console.log("server is running");
})