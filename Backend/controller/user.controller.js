import User from "../Model/user.model.js";
import { z } from "zod"; // zod is used for validating like email should have @ , password must be of 8 characters long , etc

import bcrypt from "bcryptjs";
import { generateTokenAndSaveInCookies } from "../jwt/token.js";

// This only creates the rules.
// No real data is being checked yet!
// You are just telling Zod:
// "Whenever someone sends an object, I want email, username, and password to follow these rules.
const userSchema = z.object({
  // .object() means you are creating a group of fields together
  email: z.string().email({ message: "invalid email address" }),
  // here we are validating email , string()--> means type must be string and should be of email type

  username: z
    .string()
    .min(4, { message: "username must be 4 characters long" }),
  password: z
    .string()
    .min(8, { message: "password must be atleast 8 characters long" }),
});

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // If user doesn't give any fields
    if (!email || !username || !password) {
      return res.status(400).json({ errors: "All field are required" });
    }

    // If user provide all the fields
    const validation = userSchema.safeParse({ email, username, password });
    // "Hey Zod, here is the real user's email, username, password. Please check if they match the rules I defined earlier.
    // here email, username, password here are from req.body (user input).They are NOT from the userSchema.

    if (!validation.success) {
      // res.status(400).json({errors:validation.error.errors}) // this will give whole array of errors but we only need error message

      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorMessage });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: "user already registered" });
    }

    // we have to hash password just before sending to database
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, password: hashPassword });
    await newUser.save();

    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);

      res
        .status(201)
        .json({ message: "User registered Successfully", newUser, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "error in user registration" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ errors: "All credentials are required" });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      // comparing database password and password from body
      return res.status(400).json({ errors: "Invalid email or password" });
    }
    const token = await generateTokenAndSaveInCookies(user._id, res);
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "error logging user" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "error logging out user" });
  }
};
