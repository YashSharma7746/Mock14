const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const { userModel } = require("../model/user.model");

userRouter.get("/", (req, res) => {
  res.send("HOME PAGE");
});
userRouter.post("/register", async (req, res) => {
  const { username, email, password, avatar } = req.body;
  try {
    const already = await userModel.findOne({ email });
    if (already) {
      res.status(201).send({ msg: "User is already registered" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        let newUser = new userModel({
          email,
          password: hash,
          username,
          avatar,
        });
        newUser.save();
        res.status(200).send({ msg: "User registered successfully" });
      });
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(201).send({
            msg: "Login Successully",
            token: jwt.sign({ userID: user._id }, "mock14"),
          });
        } else {
          res.status(400).send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.status(201).send({ msg: "Please register first" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

userRouter.put("/users/:id/reset", async (req, res) => {
  const id = req.params.id;
  const { password, newpassword } = req.body;
  try {
    // const updateduser = await userModel.findByIdAndUpdate(id);
    bcrypt.hash(newpassword, 5, async (err, hash) => {
      const user = await userModel.findByIdAndUpdate(id, {
        password: hash,
      });
      res.status(200).send({ msg: "Password updated successfully" });
    });
    // res.status(201).send({ msg: "Updated Successfully", updateduser });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

userRouter.patch("/users/:id/reset", async (req, res) => {
  const id = req.params.id;
  const { password, newpassword } = req.body;
  try {
    // const updateduser = await userModel.findByIdAndUpdate(id);
    bcrypt.hash(newpassword, 5, async (err, hash) => {
      const user = await userModel.findByIdAndUpdate(id, {
        password: hash,
      });
      res.status(200).send({ msg: "Password updated successfully" });
    });
    // res.status(201).send({ msg: "Updated Successfully", updateduser });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = { userRouter };
