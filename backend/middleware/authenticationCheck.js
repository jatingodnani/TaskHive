const { jwtvalidate } = require("../services/jwt.js");

function authenticatiionCheck(cookieName) {

    return (req, res, next) => {
      
        let token;
        if (req.cookies && req.cookies[cookieName]) {
            token = req.cookies[cookieName];
            console.log("cookie",token)
        }
       
        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }
        console.log("tk",token)
        if (!token) {
           throw new Error("No Token found");
        } try {
           const userpayload = jwtvalidate(token);
            console.log(userpayload)
            req.user = userpayload;
           
        } catch (error) {
            throw new Error("Invalid Token");
        }
        next();
    }
}
module.exports = { authenticatiionCheck }