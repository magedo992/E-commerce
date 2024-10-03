const ProductModel=require('../Model/ProductModel');
const { asyncWarpper}=require('../middelware/asyncWapper');
const { cloudinary } = require('../middelware/uploadImage'); 
const streamifier = require('streamifier'); 
const CategoryModel=require('../Model/CategoryModel');
const { ErrorHandler } = require('../utils/ErrorHandler');
const ApiFeture=require('../utils/apiFeture');

exports.createProduct = asyncWarpper(async (req, res, next) => {
    let { name, price, description, category } = req.body;
    name=name.toString();
    description=description.toString();
    // Ensure category exists
    const Category = await CategoryModel.findById(category);
    if (!Category) {
        return res.status(404).json({
            'status': 'error',
            'message': 'Cannot find this category'
        });
    }

    // Ensure a file has been uploaded
    if (!req.file || !req.file.buffer) {
        return res.status(400).json({
            'status': 'error',
            'message': 'Image file is required'
        });
    }

    // Helper function to upload image buffer to Cloudinary
    const uploadFromBuffer = (fileBuffer) => {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'Product' }, 
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }
            );
            streamifier.createReadStream(fileBuffer).pipe(uploadStream);
        });
    };

    // Upload the image buffer
    let result;
    try {
        result = await uploadFromBuffer(req.file.buffer);
    } catch (error) {
        return res.status(500).json({
            'status': 'error',
            'message': 'Failed to upload image to Cloudinary',
            'error': error.message
        });
    }

    // Create product with uploaded image URL
    const product = await ProductModel.create({
        name,
        price,
        description,
      
        category,
        images: result.secure_url, // Image URL
        imagePublicIds: result.public_id // Public ID for the image
    });

    // Respond with the created product
    res.status(201).json({
        'status': 'success',
        'data': product
    });
});

exports.updateProduct = asyncWarpper(async (req, res, next) => {
    const { name, price, description, category } = req.body;

    const productId = req.params.Id;
    const product = await ProductModel.findById(productId);

    if (!product) {
        return res.status(404).json({
            'status': 'error',
            'message': 'Cannot find the product'
        });
    }

    
    const Category = await CategoryModel.findById(category);
    if (!Category) {
        return res.status(404).json({
            'status': 'error',
            'message': 'Cannot find this category'
        });
    }

   
    
    
    const uploadFromBuffer = (fileBuffer) => {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ folder: 'Product' }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
            streamifier.createReadStream(fileBuffer).pipe(uploadStream);
        });
    };

    const uploadedImages = [];
    const imagePublicIds = [];
   
    if (product.imagePublicIds && product.imagePublicIds.length > 0) {
        for (const publicId of product.imagePublicIds) {
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (error) {
                return res.status(500).json({
                    message: 'Error deleting old image from Cloudinary',
                    error: error.message
                });
            }
        }
    }


    
    if (req.file) {
       
          
            
            const result = await uploadFromBuffer(req.file.buffer);
            uploadedImages.push(result.secure_url);
            imagePublicIds.push(result.public_id); 
        
    }

    
    product.name = name;
    product.price = price;
    product.description = description;
   
    product.category = category;
    product.images = uploadedImages; 
    product.imagePublicIds = imagePublicIds; 

    await product.save();

    
    res.status(200).json({
        'status': 'success',
        'data': product
    });
});

exports.getAllProducts=asyncWarpper(async (req,res,next)=>{
   

        const countDoc=await ProductModel.countDocuments();

        const apiFeture=new ApiFeture(ProductModel.find({},{'__v':0,'imagePublicIds':0}),req.query)
        .pagination(countDoc).sort().search("Products");
        const products = await apiFeture.mongoQuery; 
        
    res.status(200).json({
        'success':'success',
        'data':products,
        results: products.length,
        pagination: apiFeture.paginationResult

    });
})
exports.getProduct=asyncWarpper(async (req,res,next)=>{
    const productId=req.params.Id;
    const product=await ProductModel.findById(productId);

    if(!product)
    {
        return next(new ErrorHandler('Not found Product'));
    }
    res.status(200).json({
        'status':'success',
        data:product
    })
})

exports.deleteProduct=asyncWarpper(async (req,res,next)=>{
    const product=await ProductModel.findByIdAndDelete(req.params.Id);
    if(!product)
    {
        return res.status(404).json({
            'status':'error',
            'message':'can not found this product'
        })
    }
    if (product.imagePublicIds && product.imagePublicIds.length > 0) {
        for (const publicId of product.imagePublicIds) {
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (error) {
                return res.status(500).json({
                    message: 'Error deleting old image from Cloudinary',
                    error: error.message
                });
            }
        }
    }
    
    res.status(204).json({
        'status':'success',
        'message':'deleted success'
    });
    
})