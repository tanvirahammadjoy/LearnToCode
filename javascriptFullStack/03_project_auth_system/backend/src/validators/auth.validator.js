// 03_project_auth_system/backend/src/validators/auth.validator.js
import { check } from "express-validator";

export const registerValidator = () => {
  return [
    check("fullName").notEmpty().withMessage("Full name is required"),
    check("userName").notEmpty().withMessage("User name is required"),
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password is required"),
  ];
};

export const loginValidator = () => {
  return [
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password is required"),
  ];
};

export const refreshTokenValidator = () => {
  return [check("token").notEmpty().withMessage("Refresh token is required")];
};

export const logoutValidators = () => {
  return [check("token").notEmpty().withMessage("Refresh token is required")];
};
