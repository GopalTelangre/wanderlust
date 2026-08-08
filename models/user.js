const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// This plugin automatically adds a username,
// salt, and hash field to handle secure password hashing
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
