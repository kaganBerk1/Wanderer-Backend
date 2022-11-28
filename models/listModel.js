const mongoose = require("mongoose")

const listSchema= new mongoose.Schema({
    title:{
        type:String,
    },
    cost:{
        type: String,
    }, 
    destinationNumber:{
        type: Number,
    },  
    distance:{
        type:Number
    },
    userName:{
        type:String
    },
    places: [
        new mongoose.Schema({
          placeName: String,
          comment: String,
          cost:Number,
          ImageUrl:String,
        })
    ],
},{
    timestamps:true,
})



module.exports = mongoose.model("ListModel", listSchema)