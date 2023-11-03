const mongoose=require('mongoose');

const plantSchema=new mongoose.Schema({
    name:String,
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    light:Number,
    water:Number,
    price:Number,
    cover:Buffer
});


const Plant=mongoose.model('Plant',plantSchema,'plant');

module.exports=Plant;

