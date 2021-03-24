const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const uploader = require("../configs/cloudinary");
const isLoggedIn = require("../middlewares/isLoggedIn");
const bcryptSalt = 10;

router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(400).json({ message: "Bad credentials" });
        return;
      }

      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        res.status(400).json({ message: "Bad credentials" });
        return;
      }

      req.session.currentUser = {
        _id: foundUser._id,
        //   role: foundUser.role
      };

      res.redirect("/api/current-user");
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/signup", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password required" });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "Email already exists" });
        return;
      }

      const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

      const newUser = {
        email,
        password: hashedPassword,
      };

      User.create(newUser)
        .then((createdUser) => {
          res.status(201).json({ message: "User account created" });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/current-user", isLoggedIn, (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .select("-password")
    .then((currentUser) => {
      res.status(200).json(currentUser);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).json({ message: "Successfuly logged out" });
  });
});

module.exports = router;
