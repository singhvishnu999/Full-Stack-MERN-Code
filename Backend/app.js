const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const userRoute=require('./Routes/user.js')
const eventRoute=require('./Routes/event.js')

const connection = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/Vishnu');
    console.log("connection etablished");
}
connection().catch(err => console.log("Error occured in database"));

const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
    method: "GET POST DELETE PUT",
}

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: 'true' }))
app.use(express.static('public'));
app.use(cookieParser());


app.get('/', (req, res)=>{
    res.send(`hello world ${req.cookies.jwt}`)
})


app.use('/user', userRoute);
app.use('/event', eventRoute);

app.get('/api/checkToken', (req, res)=>{
    const token = req.cookies.jwt;
    if(token)
        res.status(200).json({success:true, token:token});
    else res.status(200).json({success:false, token:undefined});
})
    

app.listen(8080,()=> console.log("server started on 8080"));