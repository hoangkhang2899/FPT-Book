const express = require("express");

const dbHandler = require("../databaseHandler");
const router = express.Router();
router.use(express.static("public"));

const checkLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/", checkLogin, (req, res) => {
  res.render("feedback", { query: req.query.name }); //lay id cua sach truyen vao form
});
router.post("/", checkLogin, (req, res) => {
  const obj = { ...req.body, username: req.session.user.name };
  dbHandler.insertObject("Feedback", obj);
  res.redirect("/");
});

module.exports = router;
