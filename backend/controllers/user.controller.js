import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { sendWelcomeMail } from "../middleware/nodemailer.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exists." });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.json({ success: false, message: "Incorrect password." });
    }

    const token = createToken(user._id);
    return res.json({
      success: true,
      token,
      email: user.email,
      message: "User logged in.",
    });
  } catch (error) {
    return res.json({ success: false, message: "Error. Try again later." });
  }
};
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered." });
    }

    //validation
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email.",
      });
    }
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Please enter a strong password.",
      });
    }

    //encryption
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    //user creation
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    //token generation
    const token = createToken(user._id);

    //send welcome mail
    sendWelcomeMail(email, name);
    if (user) {
      return res.json({
        success: true,
        user: { name, email },
        token,
        message: "User registered successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error registering user." });
  }
};

const getAllUser = async (req, res) => {
  try {
  
    const user = await userModel.find({});
    if (user) {
      return res.json({ success: true, data: user, message: "User fetched" });
    }
  } catch (error) {
    return res.json({ success: false, message: "Error. Try again later." });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.json({ success: true, data: user, message: "User found" });
    }
  } catch (error) {
    return res.json({ success: false, message: "Error. Try again later." });
  }
};
const updateUserByEmail = async (req, res) => {
  try {
    const { name, email, phone, apartmentNo, area, landmark, city, street } = req.body;
    const user = await userModel.findOne({email})
    if (user) {
      const updatedUser = await userModel.findOneAndUpdate({ email }, {name, phoneNumber:phone, apartmentNo, street, area, landmark, city}, {new:true});
      return res.json({ success: true, data: updatedUser, message: "User updated sucessfully." });
    }
  } catch (error) {
    return res.json({ success: false, message: "Error. Try again later." });
  }
};
export { loginUser, registerUser, getAllUser, getUserByEmail, updateUserByEmail };
