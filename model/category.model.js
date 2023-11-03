const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
    label:String,
});

const Category=mongoose.model('Category',categorySchema,'category');


module.exports=Category;
