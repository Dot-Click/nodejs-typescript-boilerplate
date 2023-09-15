import { Request, Response, NextFunction } from "express";
import validator from "validator";
import ErrorHandler from "../utils/ErrorHandler";

const validateAuth = (type: string) => (req: Request, res: Response, next: NextFunction) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name && type === "register") {
    return ErrorHandler("First name is required", 400, req, res);
  }

  if (!last_name && type === "register") {
    return ErrorHandler("Last name is required", 400, req, res);
  }

  if (!email) {
    return ErrorHandler("Email is required", 400, req, res);
  }

  if (!password) {
    return ErrorHandler("Password is required", 400, req, res);
  }

  if (!validator.isEmail(email)) {
    return ErrorHandler("Invalid email", 400, req, res);
  }

  next();
};

export { validateAuth };
