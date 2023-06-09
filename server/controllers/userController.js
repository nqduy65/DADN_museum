import User from "../models/userModel.js";
import UserLog from "../models/userLogModel.js";
import genToken from "../utils/genToken.js";

export const register = async (req, res, next) => {
  console.log("co nguoi dang ki");
  const { email, password, name, avatar, phoneNumber } = req.body;
  if (!email || !password || !name || !avatar || !phoneNumber) {
    res.status(400);
    return next(new Error("All fields must be fill"));
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    return next(new Error("Email has already used!"));
  }
  const user = new User({ name, email, password, avatar, phoneNumber });
  user
    .save()
    .then((user) => {
      console.log("da luu xuong database");
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phoneNumber: user.avatar,
        token: genToken(user._id),
      });
    })
    .catch(next);
};

export const login = async (req, res, next) => {
  console.log("check login: ", req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    return next(new Error("All fields must be filled"));
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    // create a new UserLog object
    const newUserLog = new UserLog({
      name: user.name,
      role: "Giám sát viên",
    });

    newUserLog.save((err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("UserLog saved to database");
      }
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: genToken(user._id),
    });
  } else {
    res.status(400);
    return next(new Error("Invalid email or password"));
  }
};
