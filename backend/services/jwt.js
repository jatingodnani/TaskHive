const JWT=require("jsonwebtoken");



function createtoken(user){
const payload={
    id: user._id,
    email:user.email,
    name:user.fullName,

}

const token=JWT.sign(payload,process.env.SECREAT);
return token;
}
function jwtvalidate(token){
   
    const validateval=JWT.verify(token,secret);
    
    return validateval
}

module.exports={createtoken,jwtvalidate}