import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { SALT, SECRET } from "./config.js";

const generateAccessToken = ({ username, role }) => {
  const payload = {
    username,
    role,
  };
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

class AuthController {
  constructor() {
    this.users = [
      {
        username: "admin",
        password: bcrypt.hashSync("admin", SALT),
        role: "admin",
      },
    ];
  }

  login = async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .send({ error: "Username and password are required" });
      }

      const candidate = this.users.find((user) => user.username === username);

      if (!candidate) {
        return res.status(400).send({ error: "Username or password is wrong" });
      }

      if (!bcrypt.compareSync(password, candidate.password)) {
        return res.status(400).send({ error: "Username or password is wrong" });
      }

      const token = generateAccessToken({
        username: candidate.username,
        role: candidate.role,
      });

      res.status(200).json({
        username: candidate.username,
        role: candidate.role,
        token,
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: "Login error" });
    }
  };

  registration = async (req, res) => {
    try {
      const { username, password } = req.body;

      if (this.users.find((user) => user.username === username)) {
        return res.status(400).send({ error: "Username already exists" });
      }

      const newUser = {
        username,
        password: bcrypt.hashSync(password, SALT),
        role: "user",
      };

      this.users.push(newUser);

      const userData = {
        username: newUser.username,
        role: newUser.role,
      };

      const token = generateAccessToken(userData);

      res.status(201).json({ ...userData, token });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Registration error" });
    }
  };

  logout = async (req, res) => {
    try {
      res.send("logout");
    } catch (e) {
      console.error(e);
    }
  };
}

export default new AuthController();
