const User=require("../model/user.model");
const Role=require("../model/role.model");
const config=require("../config/auth.config");
const ROLES=require("../config/db.config");

const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

exports.signup=(req,res)=>{
   User.create({
    fullName:req.body.fullName,
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password,8),
    address:req.body.address,
    phone:req.body.phone
   }).then(user=>{
    if(req.body.roles){
        let authorities=[];
        Role.find().then(roles=>{
            for(let i=0;i<req.body.roles.length;i++){
                for(let j=0;j<roles.length;j++){
                    if(req.body.roles[i]===roles[j].name){
                        authorities.push(roles[j]);
                    }
                }
            }
            user.roles=authorities;
        });
   }
   else{
         Role.find({
              name:"USER"}).then(roles=>{
                user.roles=roles;
                user.save().then(()=>{
                res.send({message:"User was registered successfully!"});
                });
                });
   }
   }).catch(err=>{
         res.status(500).send({message:err.message});
    });
}
exports.signin=(req,res)=>{  
 User.find({
        email:req.body.email
 }).populate('roles','-_id').then(user=>{
    if(user.length==0){
        return res.status(404).send({message:"User Not found."});
    }
    var passwordIsValid=bcrypt.compareSync(
        req.body.password,
        user[0].password
    );
    if(!passwordIsValid){
        return res.status(401).send({
            accessToken:null,
            message:"Invalid Password!"
        });
    } 
    var token=jwt.sign({id:user[0]._id},config.secret,{
        expiresIn:86400 //24 hours
    });
    var refreshToken=jwt.sign({id:user[0]._id},config.secret,{
        expiresIn:259200 // 72 hours
    });
    var authorities=[];
    if(user[0].roles){
        for(let i=0;i<user[0].roles.length;i++){
            authorities.push("ROLE_"+user[0].roles[i].name.toUpperCase());
        }
        res.status(200).send({
            id:user[0]._id,
            fullName:user[0].fullName,
            email:user[0].email,
            address:user[0].address,
            phone:user[0].phone,
            roles:authorities,
            accessToken:token,
            refreshToken:refreshToken
       });
      }
    }).catch(err=>{
       res.status(500).send({message:err.message});
     });
}
exports.refreshToken=(req,res)=>{
    const refreshToken=req.body.refreshToken;
    if(refreshToken==null) return res.sendStatus(401);
    jwt.verify(refreshToken,config.secret,(err,decoded)=>{
        if(err) return res.sendStatus(403);
        var token=jwt.sign({id:decoded.id},config.secret,{
            expiresIn:86400 //24 hours
        });
        res.status(200).send({
            accessToken:token,
            refreshToken:refreshToken
        });
    }); 
}