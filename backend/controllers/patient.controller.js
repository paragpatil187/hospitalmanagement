const express = require("express");

const router = express.Router();


const Patient = require ("../models/patient.model");

router.get("/", async (req,res)=>{
    const page=+req.query.page || 1;
    const size=+req.query.limit ||3
    const offset=(page-1)*size
    try{
        const patients = await Patient.find({}).skip(offset).limit(size).populate("medicine").lean().exec();
        //const totalPages=Math.ceil(await Patient.find().countDocuments())/size;
//console.log(totalPages)
        return res.send(patients);

    }catch(e){
        return res.status(400).json({ status: "failed", message: e.message });
    }
})

router.post("/", async (req,res)=>{
    try{
        const patient = await Patient.create(req.body);
        return res.status(201).send(patient);

    }catch(e){
        return res.status(400).json({ status: "failed", message: e.message });
    }
    

});



router.patch("/:id", async (req,res)=>{
    try{
        const patient = await Patient.findByIdAndUpdate(req.params.id,{new: true});
        return res.status(201).send(patient);

    }catch(e){
        return res.status(400).json({ status: "failed", message: e.message });
    }
    

});


router.delete("/:id", async (req,res)=>{
    try{
        const patients = await Patient.findByIdAndDelete({patient:req.params.id}).lean().exec();
        return res.send(patients);

    }catch(e){
        return res.status(400).json({ status: "failed", message: e.message });
    }
})
router.get("/:name",async(req,res)=>{
    try{
        const patient = await Patient.find({name:req.params.name}).populate("medicine").lean().exec()
        console.log(patient)
        return res.status(201).send(patient)
    }catch(e){
       return res.status(401).json({message : e.message })
    }
})
router.get("/sort",async(req,res)=>{
    try{
        // const page = +req.query.page || 1;
        //  const size = +req.query.size || 4;
        //  const skip =(page -1 )*size

        const patient = await Patient.find().sort({age:1}).skip(skip).limit(size).populate("medicine").lean().exec()
        //const totalPages = Math.ceil((await Patient.find().countDocuments())/size)
        //console.log(patient)

        return res.status(201).json(patient)
    }catch(e){
       return res.status(401).json({message : e.message })
    }
})

router.get("/male",async(req,res)=>{
    try{
        const patient = await Patient.find({"gender":{$eq : "m"}}).lean().exec()
        
        return res.status(201).send(patient)
    }catch(e){
       return res.status(401).json({message : e.message })
    }
})

router.get("/female",async(req,res)=>{
    try{
        const patient = await Patient.find({"gender":{$eq : "f" }}).populate("medicine").lean().exec()
        
        return res.status(201).send(patient)
    }catch(e){
       return res.status(401).json({message : e.message })
    }
})


module.exports = router;