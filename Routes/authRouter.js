const bcrypt = require("bcrypt");
const express = require("express");
const { UserModel } = require("../Models/UserModel");
const { userAuth } = require("../middleware/userDetails");

let NEWEMPID = 150;

const authRouter = express.Router();

// authRouter.route("/signup").post(userSign);
authRouter.route("/login").post(userLogin);

authRouter.post("/signup", userAuth, async (req, res) => {
  console.log(req.body, "data recieved");
  try {
    bcrypt.hash(req.body.password, 5, async (err, hash) => {
      let data = req.body;
      data.id = ++NEWEMPID;
      let newUser = new UserModel({ ...data, password: hash });
      await newUser.save();
      res.json(newUser);
    });
  } catch (error) {
    let msg = { msg: error.message };
    if (error.message.includes("duplicate")) {
      msg.msg = "user already exists!!";
    }

    res.status(400).json(msg);
  }
});

// async function userSign(req, res) {
//   console.log(req.body, "data recieved");
//   try {
//     let data = req.body;
//     data.id = ++NEWEMPID;

//     // console.log("new User ---> ", data);

//     // let newUser = await UserModel.create(data);
//     let newUser = new UserModel(data);
//     await newUser.save();
//     // console.log(newUser);
//     // res.end("Data has came");
//     res.json(newUser);
//   } catch (error) {
//     console.log({ error: error.message }, "HERE");
//     res.status(400).json({ msg: error.message });
//   }
// }

async function userLogin(req, res) {
  try {
    let data = req.body;
    let user = await UserModel.findOne({ email: data.email });
    if (user) {
      bcrypt.compare(data.password, user.password, async (err, result) => {
        if (result) {
          return res.json(user);
        } else {
          return res.json({
            errorMessage: "Invaild User Credentials",
            // userpass: user.password,
            // datapass: data.password,
          });
        }
      });
      // if (user.password == data.password) {
      //   return res.json(user);
      // } else {
      //   return res.json({
      //     errorMessage: "Invaild User Credentials",
      //     userpass: user.password,
      //     datapass: data.password,
      //   });
      // }
    } else {
      return res.json({
        errorMessage: "User not found",
      });
    }
  } catch (err) {
    return res.json({
      errorMessage: err,
    });
  }
}

module.exports = authRouter;
