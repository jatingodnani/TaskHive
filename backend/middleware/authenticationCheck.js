const { jwtvalidate } = require("../services/jwt.js");

function authenticatiionCheck(cookieName) {

    return (req, res, next) => {
        console.log("hii")
        let token;
        if (req.cookies && req.cookies[cookieName]) {
            token = req.cookies[cookieName];
        }
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
           throw new Error("Invalid Token");
        } try {
           const userpayload = jwtvalidate(tokencookie);

            req.user = userpayload;
            console.log(req.user)
        } catch (error) {
            throw new Error("Invalid Token");
        }
        next();
    }
}
module.exports = { authenticatiionCheck }