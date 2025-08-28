const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcrypt");   
const User = require("../models/Users");

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const existingUser = await User.findOne({username});
        if(existingUser) {
            return res.status(400).json({ error: "Username exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword

        });
        await newUser.save();
         res.status(201).json({message: "Created new user"});
    } catch (err) {
        res.status(500).json({error: err.message });
    
    }
});

router.post("/login", async (req,res) => {
    try {
        const { username, password } =req.body;
        const user = await User.findOne({username});
        if(!user) return res.status(400).json({error:"User not found"});

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({error: "Invaild"});

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );
        res.json({ token });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});
 module.exports = router; 