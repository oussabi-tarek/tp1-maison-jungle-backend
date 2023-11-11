const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    address:String,
    phone:String,
    roles:[
         {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Role'
         }
    ],
});
 
const User=mongoose.model('User',userSchema,'user');

module.exports=User;