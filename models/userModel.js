const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        maxlenghth:32,
        trim:true,
        unique : true
    },
    password:{
        type: String,
    },  
},{
    timestamps:true,
})



module.exports = mongoose.model("UserModel", userSchema)