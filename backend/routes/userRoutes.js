const { Router } = require('express');
const User= require("../models/authModal.js");
const router = Router();
router.get('/check-auth', (req, res) => {
    res.send('User is authenticated');
});
router.post("/signup", async (req, res) => {

    const { fullname, email, password } = req.body;
    console.log(fullname, email, password)
    const user = await User.create({
        fullname,
        email,
        password
    })

    return res.redirect('/')


})

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email,password,"hii");
        const token = await User.matchpassword(email, password);




        return res.cookie("task-token", token).json({Success:true}).redirect('/')
    }
    catch (err) {
        return res.render("signin", {
            error: "Incorrect email or password",

        })
    }

})

router.get("/logout", async (req, res) => {
    res.clearCookie("")
})
module.exports = router;