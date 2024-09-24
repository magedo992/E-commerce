const mongoose=require('mongoose');

const CategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is requried"]
    },
    description:{
        type:String,
        required:[true,'descirption is requried']
    }
})

module.exports= mongoose.model('Category',CategorySchema);
