import jwt from "jsonwebtoken";
import { MOCK_DATA, users } from "../data/index.js";
import { SECRET } from "../config.js";

class TransactionController {
  getTransactions = (req, res) => {
    try {
      // const accessToken = req.headers.authorization?.split(" ")[1];

      // if (!accessToken) {
      //   return res.status(401).json({ message: "Unauthorized" });
      // }

      // const verified = jwt.verify(accessToken, SECRET);
      // const user = users.find((user) => user.username === verified.username);

      // if (!verified || !user) {
      //   return res.status(401).json({ message: "Unauthorized" });
      // }

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
      // const accessToken = req.headers.authorization?.split(" ")[1];

      // if (!accessToken) {
      //   return res.status(401).json({ message: "Unauthorized" });
      // }

      // const verified = jwt.verify(accessToken, SECRET);
      // const user = users.find((user) => user.username === verified.username);

      // if (!verified || !user) {
      //   return res.status(401).json({ message: "Unauthorized" });
      // }

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

  createTransaction = (req, res) => {
    try {
      const newTransaction = { ...req.body, id: Date.now() };
      MOCK_DATA.push(newTransaction);
      res.status(200).json(newTransaction);
    } catch (error) {
      console.table(error);

      if (error.message === "jwt expired") {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.status(400).json({ message: "Error" });
    }

  }

  updateTransaction = (req, res) => {
    try {
      const { id } = req.params;
      const updatedTransaction = { ...req.body, id };
      MOCK_DATA = MOCK_DATA.map((transaction) =>
        transaction.id === id ? updatedTransaction : transaction,
      );
      res.status(200).json(updatedTransaction);
    } catch (error) {
      console.table(error);

      if (error.message === "jwt expired") {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.status(400).json({ message: "Error" });
    }

  }

  deleteTransaction = (req, res) => {
    try {
      const { id } = req.params;
      const deletedTransaction = MOCK_DATA.find(
        (transaction) => transaction.id === id,
      )
      MOCK_DATA = MOCK_DATA.filter(
        (transaction) => transaction.id !== id,
      );
      res.status(200).json(deletedTransaction);
    } catch (error) {
      console.table(error);

      if (error.message === "jwt expired") {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.status(400).json({ message: "Error" });
    }

  }

  
}

export default new TransactionController();
