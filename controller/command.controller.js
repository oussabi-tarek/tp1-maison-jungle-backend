const Command=require('../model/command.model')
const User=require('../model/user.model');

exports.createCommand=async (req,res)=>{
    try{
        const plants=req.body.items.map(item=>item.id);
        const userSaved=await User.find({email:req.body.email}).select('_id');
         const commandToSae=new Command({
            user: userSaved[0]._id,
            date:Date.now(),
            status:'pending',
            plants:plants,
            quantities:req.body.items
         })
            const command=await commandToSae.save();
            res.status(201).json(command);
    }catch(err){
        res.status(400).json({message:err.message});
    }
   
}