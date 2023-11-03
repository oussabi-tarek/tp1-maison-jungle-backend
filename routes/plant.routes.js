const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports= app =>{
    const plants=require("../controller/plant.controller.js");
    const users=require("../controller/user.controller.js");
    const commands=require("../controller/command.controller.js");
    // plant routes
    var router = require("express").Router();
    router.get("/plants",plants.getPlants);
    router.get("/plants/:id",plants.getPlant);
    router.post("/plants",upload.single('cover'),plants.createPlant);
    // router.put("/:id",upload.single('cover'),plants.update);
    // router.delete("/:id",plants.delete);
    // router.delete("/",plants.deleteAll);

    // user routes
    router.post("/users",users.createUser);

    // command routes
    router.post("/commands",commands.createCommand);


    app.use("/api",router);
}