const mongoose = require('mongoose')

const itemSchema=mongoose.Schema({
    name:{
        type:String,
        
    },

    price:{
        type:Number,
        
    },
    
    image:{
        type:String,
    },
    

},
{timestamps:true}

)

const Item=mongoose.model("items",itemSchema)

module.exports=Item