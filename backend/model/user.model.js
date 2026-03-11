import mongoose from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
  
});

// compare password
userSchema.methods.comparePass = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// generate JWT
userSchema.methods.genrateJWT = function () {
  return JWT.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

export const UserModel = mongoose.model("user", userSchema);