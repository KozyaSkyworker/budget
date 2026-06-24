import { Router } from "express";
import authController from "./AuthController.js";

const router = Router({ mergeParams: true });

router.post("/login", authController.login);
router.post("/registration", authController.registration);
router.post("/logout", authController.logout);

export default router;
