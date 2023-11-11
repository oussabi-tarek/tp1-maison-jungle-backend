const mongoose=require('mongoose');

const roleSchema=new mongoose.Schema({
    name:String
});

const Role=mongoose.model('Role',roleSchema,'role');

module.exports=Role;