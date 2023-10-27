const Plant = require("../model/plant.model")

exports.findAll=(req,res)=>{
  Plant.findAll().then(data=>{
    res.send(data);
  }).catch(err=>{
       res.status(500).send({
        message:err.message || "Some error occurred while retrieving plants."
        });  
  });
}