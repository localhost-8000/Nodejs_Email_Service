require("dotenv").config();
const express = require("express");
const sendEmail = require("./email_service");
const app = express();

app.use(express.json());

app.route("/").get((req, res) => {
  res.send("Welcome to localhost:3000 channel");
});

app.route("/sendemail").post((req, res) => {
  try {
    const email = req.body.email;
    const options = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your account has been activated!",
      text: "Hey there\nYour accout has been created successfully.\n\nThank you",
    };
    sendEmail(options);
    res.status(200).json("Email has been sent successfully");
  } catch (err) {
    res.status(500).json("Internal error encountered!!");
  }
});

app.listen(3000, () => {
  console.log("Server has been started on port 3000");
});
