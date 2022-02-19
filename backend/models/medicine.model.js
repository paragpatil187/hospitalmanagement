const {model,Schema}= require("mongoose");

const medicineSchema=new Schema({
    name:{type:String,required:true},
    quantity:{type:Number,required:true},
    
},{
    versionKey:false,
    timestamps: true
})

const Medicine=model("medicine",medicineSchema);
module.exports=Medicine