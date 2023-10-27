const Plant = require("../model/plant.model")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })


exports.findAll=(req,res)=>{
  Plant.findAll().then(data=>{
    res.send(data);
  }).catch(err=>{
       res.status(500).send({
        message:err.message || "Some error occurred while retrieving plants."
        });  
  });
}
exports.findOne=(req,res)=>{
  const id=req.params.id;
  Plant.findByPk(id).then(data=>{
    res.send(data);
  }).catch(err=>{
    res.status(500).send({
      message:"Error retrieving plant with id="+id
    });
  });
}

exports.create=(req,res)=>{
 if(!req.body)
  {
      res.status(400).send({
      message:"Content can not be empty!"
    });
    return;
  }
  const coverBlob = Buffer.from(req.file.buffer);
 Plant.create({  
    name: req.body.name,
    category:req.body.category,
    light:req.body.light,
    water:req.body.water,
    price:req.body.price,
    cover:coverBlob
 }).then(data=>{
    res.send(data);
  }).catch(err=>{
        res.status(500).send({
          message:err.message || "Some error occurred while creating plant."
          });  
    });
}
exports.update=(req,res)=>{
  const id=req.params.id;
  const coverBlob = Buffer.from(req.file.buffer);
  req.body.cover=coverBlob;
  Plant.update(req.body,{where:{id:id}}).then(num=>{
    if(num==1){
      res.send({
        message:"Plant was updated successfully."
      });
    }else{
      res.status(500).send({
        message:`Cannot update plant with id=${id}. Maybe plant was not found or req.body is empty!`
      });
    }
  }).catch(err=>{
    res.status(500).send({
      message:"Error updating plant with id="+id
    });
  });
}
exports.delete=(req,res)=>{
  const id=req.params.id;
  Plant.destroy({where:{id:id}}).then(num=>{
    if(num==1){
      res.send({
        message:"Plant was deleted successfully."
      });
    }else{
      res.send({
        message:`Cannot delete plant with id=${id}. Maybe plant was not found!`
      });
    }
  }).catch(err=>{
    res.status(500).send({
      message:"Could not delete plant with id="+id
    });
  });
}
exports.deleteAll=(req,res)=>{
  Plant.destroy({where:{},truncate:false}).then(nums=>{
    res.send({message:`${nums} plants were deleted successfully!`});
  }).catch(err=>{
    res.status(500).send({
      message:err.message || "Some error occurred while removing all plants."
    });
  });
}