const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  role:String,
  name: String,
  contact: String,
  email: String,
  password: String,
});


userSchema.pre('save', async function(){
const salt = await bcrypt.genSalt(10);  
const hashPass = await bcrypt.hash(this.password, salt);
this.password = hashPass;
});

userSchema.methods.generateToken = function() {
  try{
  return jwt.sign({
    userId : this._id.toString(),
    role: this.role,
  },process.env.JWT_SECRET,
)
  }catch(err){
    console.error(err);
  }
}


const User = new mongoose.model("User", userSchema);
module.exports = User;
