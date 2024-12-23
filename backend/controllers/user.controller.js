import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateJWT from "../utils/jsonWebToken.js";
import nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config()

// In-memory storage for OTPs
const otpStorage = new Map();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const signup = async (req, res) => {

    const { name, email, username, password } = req.body;
    const user = await User.findOne({email});

    if (user) {
        return res.status(400).json({ error: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP with expiration (5 minutes)
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStorage.set(email, { otp, expiresAt });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Verification OTP',
        html: `<p>Hi ${name},</p>
               <p>Your OTP for verification is: <b>${otp}</b></p>
               <p>This OTP is valid for 5 minutes.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent to your email', email });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send OTP', error });
    }

};

const verifyOtp = async (req, res) => {
    try {
        const { name, email, username, password, otp } = req.body;
        // Validate OTP
        const otpData = otpStorage.get(email);
        // Proceed to create user
        if (!otpData) return res.status(400).json({ message: 'OTP not found or expired' });

        if (otpData.expiresAt < Date.now()) {
            otpStorage.delete(email);
            return res.status(400).json({ message: 'OTP expired' });
        }

        if (otpData.otp.toString() !== otp.toString()) return res.status(400).json({ message: 'Invalid OTP' });
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate JWT and send response
        generateJWT(newUser._id, res);

        // Cleanup: Remove OTP from storage
        otpStorage.delete(email);

        return res.status(201).json({
            message: 'Signup successful! Welcome to the home page.',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
                bio: newUser.bio,
                profilePic: newUser.profilePic,
            },
        });
    } catch (err) {
        console.error("Error in verifyOtp:", err.message);
        return res.status(500).json({ error: "An error occurred during signup. Please try again." });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        

        if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

        generateJWT(user._id, res);

        res.status(200).json({
            message:"successfully logged in",
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic,
        });
    } catch (err) {
        console.error("Error in login", err.message);
        return res.status(500).json({ error: "An error occurred during signup. Please try again." });
    }

}

const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in signupUser: ", err.message);
    }
}

const resetPassword = async (req, res) => {
    try {
      const { password, newPassword, email } = req.body;
  
      // Validate input
      if (!email || !password || !newPassword) {
        return res.status(400).json({ error: "All fields (email, password, newPassword) are required." });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User does not exist." });
      }
  
      console.log(`User found: ${user.email}`);
  
      // Compare the current password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Wrong old password provided." });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      // Update the password
      user.password = hashedPassword;
      await user.save();
  
      console.log("Password updated successfully:", user.email);
  
      // Respond to the client
      return res.status(200).json({ message: "Password updated successfully." });
  
    } catch (err) {
      console.error("Error in resetting password:", err.message);
      return res.status(500).json({ error: "An error occurred while resetting the password. Please try again." });
    }
  };
  

export { signup, verifyOtp, login, logout,resetPassword }