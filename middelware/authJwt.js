const jwt=require("jsonwebtoken");
const config=require("../config/auth.config");
const User=require('../model/user.model');

verifyToken=(req,res,next)=>{
  let token=req.headers["x-access-token"];

  if(!token){
      return res.status(403).send({
          message:"No token provided!"
      });
  }

  jwt.verify(token,config.secret,(err,decoded)=>{   
        if(err){
            return res.status(401).send({
                message:"Unauthorized!"
            });
        }
        req.userId=decoded.id;
        next();
  });
}

isAdmin=(req,res,next)=>{
  User.findById(req.userId).populate('roles','-_id').then(user=>{
    console.log(user);
    if(user.roles){
       for(let i=0;i<user.roles.length;i++){
           if(user.roles[i].name==="ADMIN"){
               next();
               return;
           }
       }
    }
       res.status(403).send({
           message:"Require Admin Role!"
       });
            return;
});
}
isModeratorOrAdmin=(req,res,next)=>{
  User.findById(req.userId).then(user=>{
    if(user.roles){
       for(let i=0;i<user.roles.length;i++){
           if(user.roles[i].name==="MODERATOR"){
               next();
               return;
           }
           if(user.roles[i].name==="ADMIN"){
               next();
               return;
           }
       }
    }
       res.status(403).send({
           message:"Require Moderator or Admin Role!"
       });
            return;

 });
}
isModerator=(req,res,next)=>{
  User.findById(req.userId).then(user=>{
    if(user.roles){
       for(let i=0;i<user.roles.length;i++){
           if(user.roles[i].name==="MODERATOR"){
               next();
               return;
           }
       }
    }
       res.status(403).send({
           message:"Require Moderator Role!"
       });
            return;

});
}

const authJwt={
    verifyToken:verifyToken,
    isAdmin:isAdmin,
    isModerator:isModerator,
    isModeratorOrAdmin:isModeratorOrAdmin
};

module.exports=authJwt;