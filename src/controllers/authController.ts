import { Request, Response } from "express";
import User, { IUser } from "../models/User/user";
import SuccessHandler from "../utils/SuccessHandler";
import ErrorHandler from "../utils/ErrorHandler";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
// Register
const register = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).{6,}$/
      )
    ) {
      return ErrorHandler(
        "Password must contain at least one uppercase letter, one special character, and one number",
        400,
        req,
        res
      );
    }
    const user = await User.findOne({ email });
    if (user) {
      return ErrorHandler("User already exists", 400, req, res);
    }
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password,
    });
    newUser.save();
    return SuccessHandler("User created successfully", 200, res);
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

// Login
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return ErrorHandler("User does not exist", 400, req, res);
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return ErrorHandler("Invalid credentials", 400, req, res);
    }
    const jwtToken = user.getJWTToken();
    return SuccessHandler(
      {
        message: "Logged in successfully",
        jwtToken,
        userData: user,
      },
      200,
      res
    );
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

// Logout
const logout = async (req: Request, res: Response) => {
  try {
    req.user = null;
    return SuccessHandler("Logged out successfully", 200, res);
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

export { register, login, logout };
