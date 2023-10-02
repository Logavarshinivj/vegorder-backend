const express=require("express")
const cors=require("cors")
const app = express()
const connectDb=require("./config/db")
const dotenv=require("dotenv")
const Item=require("./models/itemModel")
const{v4:uuidv4}=require("uuid")
dotenv.config()
app.use(express.json())

// app.use(
//     cors({
//       origin: '*'      
//     })
//   );
app.use(
    cors({
      origin: '*'      
    })
  );
app.use("/",require("./Routes/itemRoute"))
app.use("/",require("./Routes/userRoute"))

// app.get("/", (req, res) => {res.send("Server started🔥")})

const PORT= process.env.PORT

connectDb()

// app.get("/get-items",(req,res)=>{
//     Item.find({},(err,data)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             res.send(data)
//         }

//     })

// })



app.listen(PORT,()=>console.log(`Server started running on port ${PORT}🔥🔥🔥`))