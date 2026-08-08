const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup");
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });

    // Register the user with passport-local-mongoose (handles hashing and salting)
    const registeredUser = await User.register(newUser, password);

    // Automatically log the user in after successful signup
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    // If validation fails or username/email already exists, flash error and redirect back to signup
    if (e.code === 11000) {
      req.flash(
        "error",
        "An account with this email already exists. Please log in or use a different email.",
      );
    } else {
      req.flash("error", e.message);
    }
    res.redirect("/signup");
  }
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");

  // Fallback safely to /listings if no redirect URL is stored
  let redirectUrl = res.locals.redirectUrl || "/listings";

  // Clear it so it doesn't get stuck in a loop
  delete req.session.redirectUrl;

  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out now!");
    res.redirect("/listings");
  });
};
