const express = require("express");

const router = express.Router();


const Medicine = require ("../models/medicine.model");

router.get("/", async (req,res)=>{
    try{
        const medicines = await Medicine.find().lean().exec();
        return res.send(medicines);

    }catch(e){
        return res.status(400).json({ status: "failed", message: e.message });
    }
})

router.post("/", async (req,res)=>{
    try{
        const medicine = await Medicine.create(req.body);
        return res.status(201).send(medicine);

    }catch(e){
        return res.status(400).json({ status: "failed", message: e.message });
    }
    

});



router.patch("/:id", async (req,res)=>{
    try{
        const medicine = await Medicine.findByIdAndUpdate(req.params.id,  {new: true});
        return res.status(201).send(medicine);

    }catch(e){
        return res.status(400).json({ status: "failed", message: e.message });
    }
    

});


router.delete("/:id", async (req,res)=>{
    try{
        const medicines = await 
        Medicine.findByIdAndDelete({medicine:req.params.id}).lean().exec();
        return res.send(medicines);

    }catch(e){
        return res.status(400).json({ status: "failed", message: e.message });
    }
})

module.exports = router;