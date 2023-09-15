import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from "validator";
import { NextFunction } from "express";

dotenv.config({ path: ".././src/config/config.env" });

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  createdAt: Date;
  emailVerified: boolean;
  emailVerificationToken: number | null;
  emailVerificationTokenExpires: Date | null;
  passwordResetToken: number | null;
  passwordResetTokenExpires: Date | null;
  lastLogin: Date | null;
  isActive: boolean;
  getJWTToken: () => string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        // Custom password validation logic
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).{6,}$/.test(
          value
        );
      },
      message:
        "Password must contain at least one uppercase letter, one special character, and one number",
    },
    // validation will be before saving to db
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: Number,
  },
  emailVerificationTokenExpires: {
    type: Date,
  },
  passwordResetToken: {
    type: Number,
  },
  passwordResetTokenExpires: {
    type: Date,
  },
  lastLogin: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Hash password before saving
userSchema.pre("save", async function (this: IUser, next: NextFunction) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// JWT Token
userSchema.methods.getJWTToken = function (): string {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET || "");
};

// Compare password
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
