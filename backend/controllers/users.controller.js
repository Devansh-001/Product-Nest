import mongoose from "mongoose";
import User from "../models/users.model.js";



export const handleUserSignUp = async (req, res) => {

    const user = req.body;

    if (!user.name || !user.email || !user.password) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }


    try {
        const foundUser = await User.findOne({ email: user.email });
        if (foundUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists."
            });
        }
        const newUser = new User(user);

        await newUser.save();

        res.status(201).json({ success: true, data: newUser });
    }
    catch (error) {
        console.log("Error in Signing Up:", error.message);
        res.status(500).json({ success: false, messsage: "Server Error" });
    }
}



export const handleUserSignIn = async (req, res) => {
    const user = req.body;

    if (!user.email || !user.password) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    try {
        const userFound = await User.findOne(user);
        console.log(userFound)
        if (!userFound) {
            return res.status(401).json({ success: false, message: "Invalid Username or Password.\n If You are a new user please Sign Up" })
        }


        res.status(201).json({ success: true, data: userFound.email });
    }
    catch (e) {
        console.log("Error in Signing In:", error.message);
        res.status(500).json({ success: false, messsage: "Server Error" });
    }
}