const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    address:String,
    phone:String,
});
 
const User=mongoose.model('User',userSchema,'user');

module.exports=User;