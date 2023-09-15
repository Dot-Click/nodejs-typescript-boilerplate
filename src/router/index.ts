import { Router, Request, Response } from "express";
import auth from "./auth";

const router: Router = Router();

router.use("/auth", auth);

// API Documentation
router.route("/swagger.json").get((req: Request, res: Response) => {
  // Read the generated Swagger file (swagger_output.json)
  const swaggerDocument = require("../../swagger_output.json");
  res.json(swaggerDocument);
});

export default router;
