const User=require('../model/user.model');

exports.getAllUsers=(req,res)=>{
    User.find().then(users=>{
        res.send(users);
    }).catch(err=>{
        res.status(500).send({message:err.message});
    });
}

