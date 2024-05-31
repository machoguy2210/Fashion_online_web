const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const { sendMail } = require('./emailService');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/fashion_db')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    phone: String
});

const User = mongoose.model('accounts',UserSchema);

const waitUserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    phone: String,
    dateCreated: Date,
    verifiedNumber: Number
});

const waitUser = mongoose.model('waiting_accounts', waitUserSchema);

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    User.findOne({ email : username, password : password }, {password: 0}).then((data) => {
        console.log(data);
        if(data){
            res.send({ status : 'success', data: data });
        }else{
            res.send({ status : 'failed' });
        }
    });
});


app.post('/register', (req, res) => {
    const {name, phone, email, password} = req.body;
    console.log(name, phone, email, password);
    User.findOne({ email : email }).then((data) => {
        if(data)
            res.send({ message: "Email already exists", status: "failed" });
        else {
            waitUser.findOne({ email : email }).then((data) => {
                if(data)
                    res.send({ message: "Email already registered but not activate yet, please check the email to active the account", status: "failed" });
                else {
                    const v_number = Math.floor(Math.random() * 1000000);
                    const newUser = new waitUser({
                        name,
                        phone,
                        email,
                        password,
                        dateCreated: new Date(),
                        verifiedNumber: v_number
                    });
                    newUser.save().then(() => {
                        res.send({ message: "Please check the email for confirmation", status: "success" });
                    }); 
                    }
            });
        }
    })
});



app.listen(3001,() => {
    console.log('Server is running on port 3001');
});











