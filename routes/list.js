let express = require('express')

 
const router = express.Router();
const List = require("../models/listModel")

router.post("/create",async(req,res)=>{
    const {title,cost,destinationNumber,places,distance,userName}= req.body;
    
    const list = new List({title,cost,destinationNumber,places,distance,userName});
    list.save().then((list)=>{
        res.json(list)
    }).catch((err)=>{
        res.json(err)
    })
    
})
router.get("/",(req,res)=>{
  
    List.find().then((list)=>{
        res.json(list)
    }).catch((err)=>{
        res.status(400).send("Error")
        console.log("error")

    })
    
})

module.exports = router
