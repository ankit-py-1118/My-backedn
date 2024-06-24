const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    min: 1
  }
}, {
  timestamps: true
});


UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (err) {
    console.log(err, 'bcryptErr')
    next(err);
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (err) {
    throw err;
  }
};
const User = mongoose.model("user", UserSchema);

module.exports = {
  UserSchema: UserSchema,
};
