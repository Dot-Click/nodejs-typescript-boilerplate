import express from "express";
import * as auth from "../controllers/authController";
import { Router } from "express";
import { validateAuth } from "../validators/authValidator";

const router: Router = express.Router();

// POST
router.route("/register").post(validateAuth("register"), auth.register);
router.route("/login").post(validateAuth("login"), auth.login);

// GET
router.route("/logout").get(auth.logout);

export default router;
