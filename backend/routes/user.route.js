import express from 'express'
import { getAllUser, getUserByEmail, loginUser, registerUser, updateUserByEmail } from '../controllers/user.controller.js'
import authMidddleware from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/",  getAllUser)
userRouter.post("/getUserByEmail", authMidddleware, getUserByEmail)
userRouter.post("/updateUserByEmail", authMidddleware, updateUserByEmail)
export default userRouter