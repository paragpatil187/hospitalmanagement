const {model,Schema}= require("mongoose");

const patientSchema=new Schema({
    name:{type:String,required:true},
    gender:{type:String,required:true},
    age:{type:Number,required:true},
    medicine:[{
        type: Schema.Types.ObjectId,
        ref: "medicine",
        required: true
    }]
},{
    versionKey:false,
    timestamps: true
})

const Patient=model("patient",patientSchema);
module.exports=Patient