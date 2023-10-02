const User=require("../models/userModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = user.generateAuthToken(); // create a JWT token for the user
    const userData = { _id: user._id, name: user.name, email: user.email };
    res.header('x-auth-token', token).send(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const oldUser= await User.findOne({email})
    if(oldUser){
      return  res.send({message:"User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const result = await newUser.save();
    const token = jwt.sign({ userId: result._id }, process.env.JWT_SECRET);
    const userData = { _id: result._id, name: result.name, email: result.email};
    res.header('x-auth-token', token).send(userData);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Registration failed' });
  }
};

// const authMiddleware = (req, res, next) => {
//   const token = req.header('x-auth-token');
//   if (!token) {
//     return res.status(401).send({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded); // <-- add this line
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(400).send({ message: 'Invalid token.' });
//   }
// };


module.exports={loginController,registerController}