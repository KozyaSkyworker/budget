import jwt from "jsonwebtoken";
import dataClass from '../data/DataClass.js' 
import { SECRET } from "../config.js";

class TransactionController {
  getTransactions = (req, res) => {
    try {
      const {username} = req.query
      let ans = dataClass.getData()
      if (username) {
        ans = ans.filter((transaction) => transaction.user === username)
      } 
      res.status(200).json(ans);
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
      const usersWithTransactions = new Set(
        dataClass.getData().map((transaction) => transaction.user),
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
      dataClass.append(newTransaction)
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
      // dataClass.deleteById(id)
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
      const deletedTransaction = dataClass.findById(Number(id))
      dataClass.deleteById(Number(id))
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
