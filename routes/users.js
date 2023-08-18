/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('users');
});


router.get("/", (req, res) => {
  const templateVars = {
    user: users[req.session.user_id]
  };
  res.render("users", templateVars);
});

router.post("/", (req, res) => {
  const newUser = {
    email:req.body.email,
    name:req.body.name,
    question_title:req.body.question_title
  }
  console.log("email:" + newUser.email)
  if (newUser.email === "" || newUser.name === "" || newUser.question_title === "") {
    return res.status(400).send("Please fill in all the fileds");
  } else {
    res.redirect("/polls");
  }
});









module.exports = router;
