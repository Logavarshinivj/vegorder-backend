const express=require("express")
const { loginController,registerController,authMiddleware } = require("../controllers/userController")


const router=express.Router()


router.post("/login-veggies",loginController)


router.post("/register-veggies",registerController)


// router.get('/protected', authMiddleware, async (req, res) => {
//     try {
//       console.log(req.user); // <-- add this line
//       const user = await User.findById(req.user._id).select('-password');
//       res.send(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ message: 'Server error' });
//     }
//   });
  
  
  
  

module.exports=router