const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/fashion_db')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    School: Object,
    version: Number,
    scores: Array,
    dateCreated: Date
});

const User = mongoose.model('accounts', UserSchema);

User.find().then((users) => {
    console.log(users);
});



app.listen(3001,() => {
    console.log('Server is running on port 3001');
});











