const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const plants = require('../controller/plant.controller.js');
const {authJwt} = require("../middelware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token,Origin,Content-Type,Accept"
    );
    next();
  });
    app.get("/api/plants",[
      authJwt.verifyToken
    ],plants.getPlants);
    app.get("/api/plants/:id",
    [
     authJwt.verifyToken
    ],plants.getPlant);
    app.post("/api/plants",[
        authJwt.verifyToken,
        authJwt.isAdmin,
    ],upload.single('cover'),plants.createPlant);
    // router.put("/:id",upload.single('cover'),plants.update);
    // router.delete("/:id",plants.delete);
    // router.delete("/",plants.deleteAll);


}