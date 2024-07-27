const {Schema,model}=require("mongoose");
const { createHmac,randomBytes }=require("crypto");
const {createtoken} = require("../services/jwt.js");
const UserSchema=new Schema({
fullname:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
salt:{
    type:String
},
password:{
    type:String,
    required:true
}
},{timestamps:true});
UserSchema.pre("save",function(next){
  const user=this;
  if(!user.isModified("password")) return;
 const salt=randomBytes(16).toString();
const hash = createHmac('sha256', salt)
               .update(user.password)
               .digest('hex');
user.salt=salt;
user.password=hash;
console.log("user from",user)
next();
})
UserSchema.static("matchpassword",async function(email,password){
    const user=await this.findOne({email})
    console.log(email,password,user)
    if(!user)  throw new Error("you need to registered first");

    const salt=user.salt;
    const hash = createHmac('sha256', salt)
               .update(password)
               .digest('hex');
 console.log(hash,user.password)
 if(hash!=user.password) {throw new Error("you need to write correct password");}
 const token=createtoken(user);
    return token
})
const User=model('userDetail',UserSchema);
module.exports =User