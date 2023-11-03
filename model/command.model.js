const mongoose=require('mongoose');

const commandSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    plants:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Plant',
       }
    ],
    quantities:[
        {
            idPlant:String,
            quantity:Number
        }
    ],
    status:{
        type:String,
        enum:['pending','accepted','rejected','delivered','canceled'],
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

const Command=mongoose.model('Command',commandSchema,'command');
module.exports=Command;
