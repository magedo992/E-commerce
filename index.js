const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mountRouter = require('./Route/indexRoute');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const cors = require('cors');
const Product = require('./Model/ProductModel');


require('dotenv').config();


const db = require('./database');

db.connectToDatabase();


app.use(express.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(mongoSanitize());


app.set('view engine', 'ejs');


app.set('views', path.join(__dirname, 'views'));

// Mount Routes
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



const options = {
    definition: {
        openapi: '3.1.1',  
        info: {
            title: 'e-commerce',
            version: '1.0.0',
            description: 'API for e-commerce',  
        },
        
        servers: [ 
            {
                url: "http://localhost:5858/",
               
            }
        ],
    },
    apis: ['./Route/authRoute.js','./index.js'] 
    
};



const port = process.env.PORT || 3000;  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
