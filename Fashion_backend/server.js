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
    phone: String,
    favorite_products: Array
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
    dateDelivery: Date
});

const Order = mongoose.model('orders', orderSchema);

const voucherSchema = new mongoose.Schema({
    condition: Number,
    value: Number,
    quantity_remain: Number,
    used_quantity: Number
});

const Voucher = mongoose.model('vouchers', voucherSchema);

const revenueSchema = new mongoose.Schema({
    year: Number,
    revenue: Array
});

const Revenue = mongoose.model('revenues', revenueSchema);

const reviewSchema = new mongoose.Schema({
    productID: String,
    reviews: Array
});

const Review = mongoose.model('product_reviews', reviewSchema);

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ email : username, password : password }, {password: 0}).then((data) => {
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
                password: data.password,
                favorite_products: []
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
        res.status(200).send(data);
    });
});

app.post('/add-product', (req, res) => {
    const newProduct = new Product(req.body);
    newProduct.save()
        .then(product => res.json({ status: 'success', product }))
        .catch(err => res.status(400).json({ status: 'error', message: err.message }));
  });

app.post('/update-product/:id', (req, res) => {
    const { id } = req.params;
    const updatedProductData = req.body;
    Product.findByIdAndUpdate(id, updatedProductData, { new: true })
      .then(updatedProduct => {
        if (!updatedProduct) {
          return res.status(404).json({ status: 'error', message: 'Product not found' });
        }
        res.json({ status: 'success', product: updatedProduct });
      })
      .catch(error => res.status(500).json({ status: 'error', message: error.message }));
});

app.post('/remove-product', (req, res) => {
    const { productid } = req.body;
    Product.findOneAndDelete({ _id : productid }).then(() => {
      res.send({ status: 'success', message: 'Product removed' });
    }).catch(error => {
      res.send({ status: 'fail', message: error.message });
    });
  });

app.get('/api/orders/get/:id', (req, res) => {
    let { id } = req.params;
    Order.find({ "customer.accountID": id }).then((data)=> {
        res.status(200).send(data);
    })
});

app.get('/api/users', (req, res) => {
    User.find({}, {password: 0},).sort({name: -1}).collation({locale: 'vi'}).then((data) => {
        res.status(200).send(data);
    });
});

app.get('/api/users/number', (req, res) => {
    User.countDocuments({}).then((data) => {
        res.status(200).send(data.toString());
    });
});

app.delete('/api/users/delete/:id', (req, res) => {
    const { id } = req.params;
    User.deleteOne({ _id: id }).then(() => {
        res.status(200).send({ message: "User deleted"});
    });
});

app.put('/api/users/update/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    User.findByIdAndUpdate(id, updatedUser, { new: true }).then((data) => {
        if (data) {
            const { password, ...user } = data.toObject();
            res.status(200).send(user);
        }
        else res.status(404).send({ message: "User not found" });
    });
});

app.put('/api/users/changepassword/:id', (req, res) => {
    const { id } = req.params;
    const { currentpassword, newpassword } = req.body;
    User.findById(id).then((data) => {
        if (data.password === currentpassword) {
            data.password = newpassword;
            data.save().then(() => {
                res.status(200).send({ message: "Password changed"});
            });
        }
        else {
            res.status(200).send({ message: "Current password is incorrect"});
        }
    });
});

app.post('/api/users/add-favorite', (req, res) => {
    const { userId, id } = req.body;
    User.findById(userId, {password: 0}).then((data) => {
        if (data.favorite_products.find(p => p === id) === undefined) {
            data.favorite_products.push(id);
            data.save().then(() => {
                res.status(200).send({ status: 'success', user: data});
            });
        }
        else {
            res.status(200).send({ status: 'success', user: data });
        }
    })
});

app.post('/api/users/remove-favorite', (req, res) => {
    const { userId, id } = req.body
    User.findById(userId, {password: 0}).then((data) => {
        const index = data.favorite_products.indexOf(id);
        if (index > -1) {
            data.favorite_products.splice(index, 1);
            data.save().then(() => {
                res.status(200).send({ status: 'success', user: data});
            });
        }
        else {
            res.status(200).send({ status: 'success', user: data });
        }
    });
});

app.get('/api/vouchers', (req, res) => {
    Voucher.find({quantity_remain: {$gt: 0}}).then((data) => {
        res.status(200).send(data);
    });
});

app.get('/api/vouchers/getall', (req, res) => {
    Voucher.find({}).then((data) => {
        res.status(200).send(data);
    });
});

app.post('/api/vouchers/add', (req, res) => {
    const newVoucher = new Voucher(req.body);
    newVoucher.save().then((data) => {
        res.status(200).send({ message: "Voucher added", voucher: data });
    });
});

app.post('/api/vouchers/update/:id', (req, res) => {
    const { id } = req.params;
    const updatedVoucher = req.body;

    Voucher.findByIdAndUpdate(id, updatedVoucher, { new: true }).then((data) => {
        res.status(200).send({ message: "Voucher updated", voucher: data });
    });
});

app.get('/api/revenue', (req, res) => {
    Revenue.find({},{_id: 0}).then((data) => {
        res.status(200).send(data);
    });
});

app.post('/api/orders/new-order', (req, res) => {
    const newOrder = new Order(req.body);
    newOrder.save().then((data) => {
        res.status(200).send({ message: "Order created", order: data });
        sendMail(data.customer.email, "Order confirmation", `Your order has been placed successfully. Order ID: ${data._id}`);
    });
});
      

app.put('/orders/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ status: 'fail', message: 'Order not found' });
      }
  
      order.status = status;
  
      if (status === 'Hoàn tất') {
        order.dateDelivery = new Date();
  
        for (let product of order.products) {
          const productId = product.productID;
          const productDoc = await Product.findById(productId);
  
          if (productDoc) {
            productDoc.sold_quantity += product.quantity;
            productDoc.revenue += product.quantity * productDoc.price;
            productDoc.quantity -= product.quantity;
  
            const typeIndex = productDoc.type.findIndex(t => t.color === product.color && t.size === product.size);
            if (typeIndex !== -1) {
              productDoc.type[typeIndex].quantity -= product.quantity;
            }
  
            await productDoc.save();
          }
        }
  
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
  
        let revenueDoc = await Revenue.findOne({ year });
  
        if (!revenueDoc) {
          revenueDoc = new Revenue({ year, revenue: new Array(12).fill(0) });
        }
  
        revenueDoc.revenue[month] += (order.cost) / 100;
  
        await revenueDoc.save();
      }
  
      await order.save();
  
      res.json({ status: 'success' });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ status: 'fail', message: error.message });
    }
  });

app.get('/api/orders/getall', (req, res) => {
    Order.find({}).then((data) => {
        res.status(200).send(data);
    });
});

app.put('/api/reviews/new', (req, res) => {
    const reviews = req.body;
    const productIDs = Object.keys(reviews);
    productIDs.forEach(productID => {
        Review.findOne({ productID }).then(data => {
            if (data) {
                data.reviews.push(reviews[productID]);
                data.save();
            } else {
                const newReview = new Review({ productID, reviews: [reviews[productID]] });
                newReview.save();
            }
        });
    });
    res.status(200).send({ message: 'Review submitted' });
});

app.get('/api/reviews/get/:id', (req, res) => {
    const { id } = req.params;
    Review.findOne({ productID: id }).then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({ message: 'Reviews not found' });
        }
    });
});


app.listen(3001,() => {
    console.log('Server is running on port 3001');
});











