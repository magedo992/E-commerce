# E-Commerce API

This is an e-commerce API built using **Node.js**, **Express.js**, and **Mongoose**. The API supports user authentication, product and category management, order processing, and more, with features aimed at both users and admins.

## Features

### User Authentication and Authorization
- **Signup/Login**: Users can sign up and log in to the platform, with tokens generated using **JWT**.
- **Password Reset**: Users can reset their password via email using **Nodemailer**, with a token-based password reset system.
- **Profile Management**: Users can view and update their profile, including uploading a profile image using **Multer**. All images are stored on **Cloudinary**.

### Input Validation
- **Input Validation with Joi**: All input data, including authentication and form submissions, is validated using **Joi**.

### Category and Product Management
- **Admin/Manager Role Management**: Only admins or managers can create, update, or delete categories and products. Access to these routes is protected.
- **Image Uploads**: Product images can be uploaded using **Multer** and stored in **Cloudinary**.

### User Features
- **Cart and Wishlist**: Users can add products to their cart and wishlist, specifying the quantity of each product.
- **Order Creation**: Users can place orders, and the total price is calculated and shown. After placing an order, the cart is emptied automatically.
- **Order Cancellation**: Users can cancel their orders before an admin accepts the order.

### Admin Features
- **Order Management**: Admins can accept or cancel orders. Users cannot cancel orders once an admin has accepted them.
