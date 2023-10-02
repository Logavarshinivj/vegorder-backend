const express=require('express')
const{getAllItems,Payment}=require("../controllers/itemController")

const router=express.Router()

router.get("/get-items",getAllItems)

router.post("/payment",Payment)

module.exports=router