import bcrypt from "bcryptjs";
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
    { name: user.name,email: user.email, _id: user._id },
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

const createUsers = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required", success: false });
  }

  let user = await userModel.findOne({ email });
  if (user !== null) {
    return res.status(409).json({ msg: "User already exists", success: false });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    user = await userModel.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { name: user.name, email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(201).json({
      msg: "User created successfully",
      success: true,
      token,
      name: user.name,
      email: user.email,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ msg: "Error occured", success: false });
    }
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

export { loginUsers, createUsers };
