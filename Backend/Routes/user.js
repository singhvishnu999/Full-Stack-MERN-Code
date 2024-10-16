const express=require('express');
const { postLogin, postSignup, logout } = require('../controllers/user');
const router = express.Router();
const {userSchema} = require('../shemaValidate');

const validation = (req, res, next) =>
{
    let {error} = userSchema.validate(req.body);
    if(error){
        console.log(error);
        res.status(401).json({ success: false, message: "invalid credentials" });
    }else next();
}

router.route('/login').post(postLogin); 
router.route('/logout').get(logout); 

router.route('/signup').post(validation, postSignup)

module.exports=router;