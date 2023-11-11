const User=require('../model/user.model');
const ROLES=require('../config/db.config').ROLES;

checkDuplicateFullNameOrEmail=(req,res,next)=>{
  // Full Name
  User.find({
           fullName:req.body.fullName
    }).then(user=>{
          if(user.length>0){
            res.status(400).send({
                message:"Failed! Full Name is already in use!"
            });
            return;
          }
    // Email
    User.find({ email:req.body.email
    }).then(user=>{
         if(user.length>0){
             res.status(400).send({
                  message:"Failed! Email is already in use!"
             });
             return;
         }
         next();
     });
    });       
};

checkRolesExisted=(req,res,next)=>{
  if(req.body.roles){
    for(let i=0;i<req.body.roles.length;i++){
        if(!ROLES.includes(req.body.roles[i])){
            res.status(400).send({
                message:`Failed! Role ${req.body.roles[i]} does not exist!`
            });
            return;
        }
    }
  }
  next();
}

const verifySignUp={
    checkDuplicateFullNameOrEmail:checkDuplicateFullNameOrEmail,
    checkRolesExisted:checkRolesExisted
};

module.exports=verifySignUp;