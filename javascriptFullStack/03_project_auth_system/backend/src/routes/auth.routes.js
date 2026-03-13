// javascriptFullStack/03_project_auth_system/backend/src/routes/auth.routes.js
import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
  refreshTokenValidator,
  logoutValidators,
} from "../validators/auth.validator.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/register", registerValidator(), validate, registerUser);
router.post("/login", loginValidator(), validate, loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logoutValidators(), validate, protect, logoutUser);

export default router;
