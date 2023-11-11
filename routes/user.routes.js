const {authJwt} = require("../middelware");
const userController=require("../controller/user.controller");

module.exports=function(app){
  app.use(function(req,res,next){
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token,Origin,Content-Type,Accept"
        );
        next();
    });
    app.get("/api/users",[
      authJwt.verifyToken,
      authJwt.isAdmin
    ],userController.getAllUsers);
}