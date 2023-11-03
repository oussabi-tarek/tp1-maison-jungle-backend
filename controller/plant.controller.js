const Plant = require("../model/plant.model")
const category = require("../model/category.model")

exports.createPlant =async function (req, res) {
  const coverBlob = Buffer.from(req.file.buffer);
  const Category=await category.find({label:req.body.category}).select('_id');
  const plant = new Plant({
        name: req.body.name,
        category: Category[0]._id,
        light: req.body.light,
        water: req.body.water,
        price: req.body.price,
        cover:coverBlob
    })
     try {
        const newPlant = await plant.save()
        res.status(201).json(newPlant)
     }catch (err) {
        res.status(400).json({ message: err.message })
     }
}

exports.getPlants = async function (req, res) {
      try {
         const plants = await Plant.find().populate('category','-_id').select('-__v');
         res.json(plants)
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
exports.getPlant = async function (req, res) {
      try {
         const plant = await Plant.findById(req.params.id);
         res.json(plant)
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
}  
exports.updatePlant = async function (req, res) {
      try {
         const plant = await Plant.findById(req.params.id);
         const coverBlob = Buffer.from(req.file.buffer);
         plant.name = req.body.name
         plant.category = req.body.category
         plant.light = req.body.light
         plant.water = req.body.water
         plant.price = req.body.price
         plant.cover = coverBlob
         const updatedPlant = await plant.save()
         res.json(updatedPlant)
      } catch (err) {
         res.status(400).json({ message: err.message })
      }
   }

   





// exports.findAll=(req,res)=>{
//   Plant.findAll().then(data=>{
//     res.send(data);
//   }).catch(err=>{
//        res.status(500).send({
//         message:err.message || "Some error occurred while retrieving plants."
//         });  
//   });
// }
// exports.findOne=(req,res)=>{
//   const id=req.params.id;
//   Plant.findByPk(id).then(data=>{
//     res.send(data);
//   }).catch(err=>{
//     res.status(500).send({
//       message:"Error retrieving plant with id="+id
//     });
//   });
// }

// exports.create=(req,res)=>{
//  if(!req.body)
//   {
//       res.status(400).send({
//       message:"Content can not be empty!"
//     });
//     return;
//   }
//   const coverBlob = Buffer.from(req.file.buffer);
//  Plant.create({  
//     name: req.body.name,
//     category:req.body.category,
//     light:req.body.light,
//     water:req.body.water,
//     price:req.body.price,
//     cover:coverBlob
//  }).then(data=>{
//     res.send(data);
//   }).catch(err=>{
//         res.status(500).send({
//           message:err.message || "Some error occurred while creating plant."
//           });  
//     });
// }
// exports.update=(req,res)=>{
//   const id=req.params.id;
//   const coverBlob = Buffer.from(req.file.buffer);
//   req.body.cover=coverBlob;
//   Plant.update(req.body,{where:{id:id}}).then(num=>{
//     if(num==1){
//       res.send({
//         message:"Plant was updated successfully."
//       });
//     }else{
//       res.status(500).send({
//         message:`Cannot update plant with id=${id}. Maybe plant was not found or req.body is empty!`
//       });
//     }
//   }).catch(err=>{
//     res.status(500).send({
//       message:"Error updating plant with id="+id
//     });
//   });
// }
// exports.delete=(req,res)=>{
//   const id=req.params.id;
//   Plant.destroy({where:{id:id}}).then(num=>{
//     if(num==1){
//       res.send({
//         message:"Plant was deleted successfully."
//       });
//     }else{
//       res.send({
//         message:`Cannot delete plant with id=${id}. Maybe plant was not found!`
//       });
//     }
//   }).catch(err=>{
//     res.status(500).send({
//       message:"Could not delete plant with id="+id
//     });
//   });
// }
// exports.deleteAll=(req,res)=>{
//   Plant.destroy({where:{},truncate:false}).then(nums=>{
//     res.send({message:`${nums} plants were deleted successfully!`});
//   }).catch(err=>{
//     res.status(500).send({
//       message:err.message || "Some error occurred while removing all plants."
//     });
//   });
// }