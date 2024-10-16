const Users = require("../modals/User");
const bcrypt = require("bcryptjs");

module.exports.postLogin = async (req, res) => {
  const body = req.body;
  const user = await Users.findOne({ email: body.email });
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid User" });
  }

  const match = await bcrypt.compare(body.password, user.password);
  if (!match) {
    return res
      .status(400)
      .json({ success: false, message: "Incorrect Password Try Again" });
  }
  if (user.role != body.role) {
    return res
      .status(400)
      .json({ success: false, message: `You are not an ${body.role}` });
  }

  const token = user.generateToken();
  res
    .status(200)
    .cookie("jwt", token, {
      maxAge: 60 * 60 * 1000,
      secure: false,    // Set this to true if using HTTPS
    })
    .json({
      success: true,
      token,
      message: "SuccessFully Login ! ",
      
    });
};

module.exports.logout = async (req, res) => { 
  res.clearCookie("jwt").status(200).json({success:true})
};

module.exports.postSignup = async (req, res) => {
  const user = new Users(req.body);

  await user.save();
  res.status(200).json({
    success: true,
    token: user.generateToken(),
    message: "Signup Successfully ! ",
  });
};
