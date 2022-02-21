const express=require("express");
const app=express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/user", async (req,res)=>{
    try{
        const user = await User.find().lean().exec();
        return res.send(user);
  
    }catch(e){
        return res.status(400).json({ status: "failed", message: e.message });
    }
  })

  const {register,login} = require ("./controllers/user.controller");

app.use("/register", register);
app.use("/login", login);

const medicineController = require("./controllers/medicine.controller");

app.use("/medicine", medicineController);


const patientController = require ("./controllers/patient.controller")

app.use("/patient", patientController);


module.exports= app;