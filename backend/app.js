const express = require('express');
const path = require('path')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require('./config/config');
const studentRoutes = require('./routes/students');


const app = express();

//connect to Mongo
mongoose.connect(config.urls.mongodb + '/studentDetails', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Mongodb');
    })
    .catch(() => {
        console.log('Connection Failed!..')
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname + '/../')));
app.use(express.static(__dirname + '/../client/'));

app.use("/api/students", studentRoutes);

app.use(function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/index.html'))
})

module.exports = app;