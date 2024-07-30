const { Router } = require('express');
const User = require("../models/authModal.js");
const { authenticatiionCheck } = require('../middleware/authenticationCheck.js');

const router = Router();

router.get('/check-auth', authenticatiionCheck("task-token"),(req, res) => {
    if (req.user) {
        return res.json({ authenticated: true, user: req.user });
    }
    res.json({ authenticated: false });
});

router.post("/signup", async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        console.log(fullname, email, password);
        const user = await User.create({
            fullname,
            email,
            password
        });
        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await User.matchpassword(email, password);
        console.log(token, "hii bsdk");
        
        return res.cookie("task-token", token, {
            httpOnly: true,
            maxAge: 3600000,
            sameSite: 'none',
  secure: true
        }).json({ success: true, token });
    } catch (err) {
        return res.status(401).json({ error: "Incorrect email or password" });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("task-token");
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
