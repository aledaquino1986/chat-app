const User = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/app");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const secret = require("crypto").randomBytes(64).toString("hex");
    // find the user
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    //check if user found

    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    //check if password doesn't matche

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // generate auth token

    const userWithToken = generateToken(user.get({ raw: true }));

    console.log(
      "llegué al servidor, antes del user with token",
      email,
      password
    );
    res.send(userWithToken);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const userWithToken = generateToken(user.get({ raw: true }));
    return res.send(userWithToken);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const generateToken = user => {
  console.log(user);
  delete user.password;
  const token = jwt.sign(user, config.appKey, { expiresIn: 86400 });

  return { ...user, ...{ token } };
};
