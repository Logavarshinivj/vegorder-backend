const Item=require("../models/itemModel")
const stripe=require("stripe")("sk_test_51NuYBISFYgTxdzKkskVrdhK15TpmkXmPnkvE5zNK3NOQJl7B4vGd9Px1IN1lZgyfPzTH2czH3UkSCjd8ujlIiBVl00IG5mJVqJ")
const{v4:uuidv4}=require("uuid")
const getAllItems=async(req,res)=>{
    try{
        let item=await Item.find({})
        res.send(item)
    }

    catch{
        console.log("error")
        res.send("Error")

    }
}

const Payment=(req,res)=>{
    
    // console.log(req.body)
    // res.send('working')
    // try 
    // {
        const { item, totalPrice, token } = req.body;
        const transcationKey = uuidv4();
        return stripe.customers.create(
            {
                email: token.email,
                source: token.id,
              }

        )
        // const customer = await stripe.customers
        //   .create({
        //     email: "token.email",
        //     source: token.id,
        //   })
          .then((customer) => {
            stripe.charges.create({
              amount: totalPrice,
              currency: "inr",
              customer: customer.id,
              receipt_email: token.email,
             
            })
            // response.status(200).send({ message: "payment successfully" }); 
      
      .then((result)=>{
        res.json(result)
      })
      .catch((error) => {
        console.log(error)
      })
    })


    }
// }


module.exports={getAllItems,Payment}