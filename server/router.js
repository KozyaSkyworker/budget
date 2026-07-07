import { Router } from "express";
import authController from "./controllers/AuthController.js";
import userController from "./controllers/UserController.js";
import transactionController from "./controllers/TransactionController.js";
import { checkTokenMiddleware } from './middleware/checkToken.js'

const router = Router({ mergeParams: true });

router.post("/login", authController.login);
router.post("/registration", authController.registration);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);

router.get("/me", checkTokenMiddleware, userController.getMe);

router.get("/transactions", checkTokenMiddleware, transactionController.getTransactions);
router.post("/transactions", checkTokenMiddleware, transactionController.createTransaction);
router.delete("/transactions/:id", checkTokenMiddleware, transactionController.deleteTransaction);
router.get(
  "/transactions/users", checkTokenMiddleware,
  transactionController.getUsersWithTransactions,
);

export default router;
