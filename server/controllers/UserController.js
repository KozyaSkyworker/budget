import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import { users } from "../data/index.js";

class UserController {
  getMe = (req, res) => {
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

      res.status(200).json({
        username: user.username,
        role: user.role,
      });
    } catch (e) {
      console.table(e);

      if (e.message === "jwt expired") {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.status(400).json({ message: "Error" });
    }
  };
}

export default new UserController();
