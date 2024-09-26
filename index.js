const express=require('express');
const bodyParser=require('body-parser')
const app=express();
const authRoute=require('./Route/authRoute');
const categoryRoute=require('./Route/CategoryRoute');
const ProductRoute=require('./Route/ProductRoute');
const CartRoute=require('./Route/CartRoute');
const OrderRoute=require('./Route/OrderRoute');
require('dotenv').config()
const cors=require('cors');

const db=require('./database');
const product = require('./Model/ProductModel');

db.connectToDatabase(); 
app.use(express.json({limit:'100kb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use('/api',authRoute);
app.use('/api/v1',categoryRoute);
app.use('/api/v1/product',ProductRoute);
app.use('/api/v1/Cart',CartRoute);
app.use('/api/v1/order',OrderRoute);






app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message
    });
});

const port =process.env.port;
app.listen(port,()=>{
    console.log(`listen on port ${port}`);
    
})