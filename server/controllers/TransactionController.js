import jwt from "jsonwebtoken";
import { MOCK_DATA, users } from "../data/index.js";
import { SECRET } from "../config.js";

class TransactionController {
  getTransactions = (req, res) => {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];

      if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const verified = jwt.verify(accessToken, SECRET);
      const user = users.find((user) => user.username === verified.username);

      if (!verified || !user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.status(200).json(MOCK_DATA);
    } catch (error) {
      console.table(error);

      if (error.message === "jwt expired") {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.status(400).json({ message: "Error" });
    }
  };

  getUsersWithTransactions = (req, res) => {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];

      if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const verified = jwt.verify(accessToken, SECRET);
      const user = users.find((user) => user.username === verified.username);

      if (!verified || !user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const usersWithTransactions = new Set(
        MOCK_DATA.map((transaction) => transaction.user),
      );
      res.status(200).json([...usersWithTransactions]);
    } catch (error) {
      console.table(error);

      if (error.message === "jwt expired") {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.status(400).json({ message: "Error" });
    }
  };
}

export default new TransactionController();
