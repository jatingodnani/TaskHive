const { Router } = require('express');
const User = require("../models/authModal.js");
const router = Router();

router.get('/check-auth', (req, res) => {
    res.send('User is authenticated');
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

        // Return a success message or the created user
        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password, "hii");
        const token = await User.matchpassword(email, password);
        return res.cookie("task-token", token).json({ success: true, token });
    } catch (err) {
        return res.status(401).json({ error: "Incorrect email or password" });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("task-token");
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
