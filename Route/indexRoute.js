const authRoute=require('./authRoute');
const categoryRoute=require('./CategoryRoute');
const ProductRoute=require('./ProductRoute');
const CartRoute=require('./CartRoute');
const OrderRoute=require('./OrderRoute');
const wishListRoute=require('./wishListRoute')


const mountRouter=(app)=>{
    app.use('/api',authRoute);
app.use('/api/v1',categoryRoute);
app.use('/api/v1/product',ProductRoute);
app.use('/api/v1/Cart',CartRoute);
app.use('/api/v1/order',OrderRoute);
app.use('/api/v1',wishListRoute);

}

module.exports=mountRouter;