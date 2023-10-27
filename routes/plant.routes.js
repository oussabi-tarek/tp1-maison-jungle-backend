module.exports= app =>{
    const plants=require("../controller/plant.controller.js");

    var router = require("express").Router();
    router.get("/",plants.findAll);
    // router.post("/",plants.create);
    // router.put("/:id",plants.update);
    // router.delete("/:id",plants.delete);
    // router.delete("/",plants.deleteAll);

    app.use("/api/plants",router);
}