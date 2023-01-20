const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registration = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send('User has been created!')
  } catch (err) {
    next(err)
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});
    !user && res.status(401).json("Wrong password or username!");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(401).json("Wrong password or username!");

    const token = jwt.sign(
      {id: user._id, isAdmin: user.isAdmin},
      process.env.JWT
    );

    const {password, isAdmin, ...otherDetails} = user._doc;

    res.status(200).json({ details: { ...otherDetails, token }, isAdmin })
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  login,
  registration,
}
