const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports= app =>{
    const plants=require("../controller/plant.controller.js");

    var router = require("express").Router();
    router.get("/",plants.findAll);
    router.get("/:id",plants.findOne);
    router.post("/",upload.single('cover'),plants.create);
    router.put("/:id",upload.single('cover'),plants.update);
    router.delete("/:id",plants.delete);
    router.delete("/",plants.deleteAll);

    app.use("/api/plants",router);
}