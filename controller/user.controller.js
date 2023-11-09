const User=require('../model/user.model');

exports.createUser=async (req,res)=>{
    try{
        const userSaved=await User.find({email:req.body.email});
        if(userSaved.length>0){
            res.status(400).json({message:"user already exists"});
        }
        else{
        const userToSave=new User({
            fullName:req.body.fullName,
            email:req.body.email,
            password:req.body.password,
            address:req.body.address,
            phone:req.body.phone
        })
        const user=await userToSave.save();
        res.status(201).json(user);
         }
    }catch(err){
        res.status(400).json({message:err.message});
    }
}
exports.getUser=async (req,res)=>{
    try{
        const user=await User.find({email:req.body.email,password:req.body.password});
        res.json(user);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
