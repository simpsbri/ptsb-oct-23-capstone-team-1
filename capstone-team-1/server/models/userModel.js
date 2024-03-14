const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: Number, required: true },
    projectId: { type: Number, required: true },
    projectTasks: { type: [String], required: true },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
      role: { type: String, required: true },
      postedAt: { type: Date, required: true },
      status: { type: String, required: true },
      languages: { type: [String], required: true },
    },
  },

  {
    timestamps: true,
  }
);

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);

module.exports = User;
