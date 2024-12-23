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
    const user = await User.findOne({ $or: [{ email }, { username }] });

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

}

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


export { signup, verifyOtp }