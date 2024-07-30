const JWT = require("jsonwebtoken");



function createtoken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        name: user.fullname,

    }
    console.log(process.env.SECREAT)
    const token = JWT.sign(payload, process.env.SECREAT);
    return token;
}
function jwtvalidate(token) {

    const validateval = JWT.verify(token, process.env.SECREAT);
    console.log("validate karo",validateval);
    return validateval
}

module.exports = { createtoken, jwtvalidate }