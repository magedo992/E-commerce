const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mountRouter = require('./Route/indexRoute');

const path = require('path');
const cors = require('cors');
const Product = require('./Model/ProductModel');


require('dotenv').config();


const db = require('./database');

db.connectToDatabase()


app.use(express.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



app.set('view engine', 'ejs');


app.set('views', path.join(__dirname, 'views'));


mountRouter(app);


app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message
    });
});

app.get('/Home', async (req, res, next) => {
    try {
        const products = await Product.find({}, { '__v': 0, 'imagePublicIds': 0 }).limit(5);
        res.status(200).json({
            status: 'success',
            data: products
        });
    } catch (error) {
        next(error); 
    }
});







const port = process.env.PORT || 3000;  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
