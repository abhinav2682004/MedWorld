require("dotenv").config()
const express=require('express')
const app=express();
const port=process.env.PORT;
const signUpRoute=require('./routes/signup.route')
const loginRoute=require('./routes/login.route')
const cartRoute=require('./routes/cart.route')
const adminRoute=require('./routes/admin.route')
const orderRoute=require('./routes/orders.route')
const homeRoute=require('./routes/home.route')
const checkRoute=require('./routes/checkUser.route')
const profileRoute=require('./routes/profile.route')
const feedbackRoutes = require('./routes/feedback.route');



const cors=require('cors');
app.use(express.json());
app.use(cors());
const mongoose=require('mongoose')
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Successful connection"));

app.use('/signup',signUpRoute)
app.use('/login',loginRoute)
app.use('/home',homeRoute)
app.use('/admin',adminRoute)
app.use('/cart',cartRoute)
app.use('/orders',orderRoute)
app.use('/checkUser',checkRoute)
app.use('/profile',profileRoute)
app.use('/feedback', feedbackRoutes);

app.listen(port,()=>{
    console.log(`Server listening at port ${port}..`)
})
