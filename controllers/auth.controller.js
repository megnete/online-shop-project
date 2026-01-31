const User = require("../models/user.model");
const authUtils = require("../util/authentication");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res, next) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city,
  );
 try {
await user.signup();
} catch (error) {
  next(error);
  return;
}
res.redirect("/login");
}



function getLogin(req, res) {
  res.render("customer/auth/login");
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
 existingUser = await user.getUserWithSameEmail();
  }
  catch (error){
    next(error);
    return;
  }
  
  if (!existingUser) {
    res.redirect("/login");
    return;
  }
  const passwordIsValid = await user.hasMatchingPassword(existingUser.password);
  if (!passwordIsValid) {
    res.redirect("/login");
    return;
  }
authUtils.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req,res){
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup,
  signup,
  getLogin,
  login,
  logout
};

const User = require("../models/user.model");
const authUtils = require("../util/authentication");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city,
  );
  await user.signup();
  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("customer/auth/login");
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.getUserWithSameEmail();

  if (!existingUser) {
    res.redirect("/login");
    return;
  }
  const passwordIsValid = await user.hasMatchingPassword(existingUser.password);
  if (!passwordIsValid) {
    res.redirect("/login");
    return;
  }
authUtils.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

module.exports = {
  getSignup,
  signup,
  getLogin,
  login
};
