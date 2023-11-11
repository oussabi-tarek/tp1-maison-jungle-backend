const {authJwt} = require("../middelware");
const commands=require("../controller/command.controller");

module.exports=function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token,Origin,Content-Type,Accept"
       );
       next();
    });
    app.post("/api/commands",[
        authJwt.verifyToken, 
    ],commands.createCommand);

    app.get("/api/commands",[authJwt.verifyToken],commands.getCommands)
}