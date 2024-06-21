const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const { sendMail } = require('./emailService');
const { ObjectId } = require('mongodb');
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
    verifiedNumber: String
});

const waitUser = mongoose.model('waiting_accounts', waitUserSchema);

const productSchema = new mongoose.Schema({
    product_name: String,
    image_link: Array,
    price: Number,
    size: Array,
    color: Array,
    type: Array,
    quantity: Number,
    description: String,
    rating: Number,
    revenue: Number,
    sold_quantity: Number,
    category: String
});

const Product = mongoose.model('products', productSchema);

const orderSchema = new mongoose.Schema({
    customer: Object,
    cost: Number,
    quantity: Number,
    products: Array,
    status: String,
    voucherID: String,
    payment: String,
    dateOrdered: Date,
    dateDelievery: Date
});

const Order = mongoose.model('orders', orderSchema);



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
                    let v_number = Math.floor(Math.random() * 1000000);
                    v_number = v_number.toString().padStart(6, '0');
                    const newUser = new waitUser({
                        name,
                        phone,
                        email,
                        password,
                        dateCreated: new Date(),
                        verifiedNumber: v_number
                    });
                    newUser.save().then(() => {
                        sendMail(email, "Verification code to activate your account on ElMacho's Fashion Store", v_number);
                        res.send({ message: "Please check the email for confirmation", status: "success" });
                    }); 
                    }
            });
        }
    })
});

app.post('/search', (req, res) => {
    const { email } = req.body;
    console.log(email); 
    waitUser.findOne({ email : email }, {password: 0}).then((data) => {
        if(data)
            res.send({ status: "success", user: data });
        else
            User.findOne({email: email}, {password: 0}).then((userdata) => {
                if (userdata)
                    res.send({ status: "failed", message: "Email already registered, please log in"});
                else
                    res.send({ status: "failed", message: "Email not found"});
            });
    })
});

app.post('/verify', (req, res) => {
    const { email, number } = req.body;
    console.log(email, number);
    waitUser.findOne({ email : email, verifiedNumber: number }).then((data) => {
        if(data){
            const newUser = new User({
                name: data.name,
                phone: data.phone,
                email: data.email,
                password: data.password
            });
            newUser.save().then(() => {
                waitUser.deleteOne({ email: email }).then(() => {
                    res.send({ status: "success", message: "Account activated"});
                });
            });
        }else{
            res.send({ status: "failed", message: "Verification code is incorrect"}); 
        }
    });
});

app.post('/resend', (req, res) => {
    const { email } = req.body;
    console.log(email);
    waitUser.findOne({ email : email }).then((data) => {
        if(data){
            sendMail(email, "Verification code to activate your account on ElMacho's Fashion Store" ,data.verifiedNumber);
            res.send({ status: "success", message: "Verification code has been sent"});
        }
        else{
            res.send({ status: "failed", message: "Email not found"});
        }
    })
});

app.get('/api/products', (req,res) => {
    Product.find({}).then((data) => {
        res.status(200);
        res.send(data);
    });
});


app.get('/api/orders/:id', (req, res) => {
    let { id } = req.params;
    id = new ObjectId(id);
    Order.find({ "customer.accountID": id }).then((data)=> {
        res.status(200);
        res.send(data);
    })
});

app.get('/api/users', (req, res) => {
    User.find({}, {password: 0},).sort({name: -1}).collation({locale: 'vi'}).then((data) => {
        res.status(200);
        res.send(data);
    });
});

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    User.deleteOne({ _id: id }).then(() => {
        res.status(200);
        res.send({ message: "User deleted"});
    });
});
      

app.listen(3001,() => {
    console.log('Server is running on port 3001');
});











