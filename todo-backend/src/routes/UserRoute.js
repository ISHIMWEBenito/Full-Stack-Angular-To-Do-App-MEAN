const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//model imports
const User = require("../models/UserModel");

const SECRET = "idhiadhkladkndkan980e7070270928093uhlwndkndknakdnad";


const router = express.Router();

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong!" });
    }    
}

const login = async (req, res) => {
    const { username, password} = req.body;

    let errors = {};

    if (username.trim() === "") {
        errors.username = "Username cannot be empty";
    }
    if (password.trim() === "") {
        errors.password = "Password cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }


    try {
        const user = await User.findOne({ username: username });
        if (user === null) {
            return res.status(400).json({ error: "Username/password is wrong." });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Username/password is wrong." });
        } 

        const token = jwt.sign(username, SECRET);

        return res.status(200).json({  
            user: {
                _id: user._id,
                username: user.username
            },
            token: token
        });


    } catch (error) {
        return res.status(500).json({ error: "Something went wrong!" });
    }
}

const register = async (req, res) => {
    const { username, password, confirmPassword,  email} = req.body;

    let errors = {};

    if (username.trim() === "") {
        errors.username = "Username cannot be empty";
    }
    if (password.trim() === "") {
        errors.password = "Password cannot be empty";
    }
    if (password != confirmPassword) {
        errors.error = "Password and confirm password does not match."
    }

    try {
        const user = await User.findOne({ username: username });
        if (user !== null) {
            return res.status(400).json({ error: "Username already exists" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong!" });
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    try {
        let encodedPassword = await bcrypt.hash(password, 6);
        const userObj = new User({  
            username: username,
            password: encodedPassword,
            email: email
        });
        const savedUser = await userObj.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong!" });
    }
} 

router.post("/register", register);
router.post("/login", login);
router.get("", getAllUsers);


module.exports = router;