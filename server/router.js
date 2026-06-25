import { Router } from "express";
import authController from "./controllers/AuthController.js";
import userController from "./controllers/UserController.js";

const router = Router({ mergeParams: true });

router.post("/login", authController.login);
router.post("/registration", authController.registration);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);

router.get("/me", userController.getMe);

export default router;
