const User = require ("../models/user.model");


const register = async (req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email}).lean().exec();
        
        if(user){
            return res.status(201).send("email already exist");
        }

        user = await User.create(req.body);
        return res.status(201).send(user);

    }catch(e){
        return res.status(400).json({ status:"failed", messege: e.message});
    }
}

const login = async (req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email});
        let username = await User.findOne({username:req.body.email});
        console.log(user,username);

        if(!user && !username){
            return res.status(201).json({status:"failled",message: "email or password is incorrect"});

        }
        console.log("aaaa");




        if(!user){
            const match = await username.checkPassword(req.body.password);
            console.log(match);
            if(match){
                return res.send(username);
            }else{
                return res.status(201).json({status:"failled",message: "email or password is incorrect"});
            }

        } else{
            const match = await user.checkPassword(req.body.password);
            console.log(match);
            if(match){
                return res.send(user);
            }else{
                return res.status(201).json({status:"failled",message: "email or password is incorrect"});
            }

        }
        
        

    }catch(e){
        return res.status(400).json({ status:"failled", message: e.message});
    }
}

module.exports = {register,login}