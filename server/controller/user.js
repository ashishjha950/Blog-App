import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

const loginUsers = async(req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ msg: "Email or Password is wrong", success: false });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ msg: "Email or Password is wrong", success: false });
  }
  const token = jwt.sign(
    { email: user.email, _id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  ); 
  
  return res
    .status(200)
    .json({
      msg: "Successfully Login",
      success: true,
      token,
      name: user.name,
      email: user.email,
    });
};

const createUsers = async(req, res) => {
    const {name, email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    return res
      .status(409)
      .json({ msg: "User already exist", success: false });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);

  user = await userModel.create({name,email,password:hashedPassword})

  const token = jwt.sign(
    { email: user.email, _id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  ); 
  
  return res
    .status(200)
    .json({
      msg: "Successfully Login",
      success: true,
      token,
      name: user.name,
      email: user.email,
    });
};

export { loginUsers, createUsers };
