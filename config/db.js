// const mongoose = require('mongoose')

// var MONGOURL="mongodb+srv://varshinivj:Varshu08@cluster0.wm3pj8k.mongodb.net/vegetables"


// mongoose.connect(MONGOURL)

const mongoose=require("mongoose")
const connectDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGOURL)
        console.log("Mongodb connected")
    }
    catch{
        console.log("error")
    }
}

module.exports=connectDb