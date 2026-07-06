import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import tokentsController from "./TokensController.js";

import { SALT } from "../config.js";
import { users } from "../data/index.js";

class AuthController {
  login = async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .send({ error: "Username and password are required" });
      }

      const candidate = users.find((user) => user.username === username);

      if (!candidate) {
        return res.status(400).send({ error: "Username or password is wrong" });
      }

      if (!bcrypt.compareSync(password, candidate.password)) {
        return res.status(400).send({ error: "Username or password is wrong" });
      }

      const tokens = tokentsController.generateTokens({
        username: candidate.username,
        role: candidate.role,
      });

      res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
      res.status(200).json({
        username: candidate.username,
        role: candidate.role,
        token: tokens.accessToken,
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: "Login error" });
    }
  };

  registration = async (req, res) => {
    try {
      const { username, password } = req.body;

      if (users.find((user) => user.username === username)) {
        return res.status(400).send({ error: "Username already exists" });
      }

      const newUser = {
        username,
        password: bcrypt.hashSync(password, SALT),
        role: "user",
      };

      users.push(newUser);

      const userData = {
        username: newUser.username,
        role: newUser.role,
      };

      const tokens = tokentsController.generateTokens(userData);
      res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
      res.status(201).json({ ...userData, token: tokens.accessToken });
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
      res.status(400).json({ message: "Logout error" });
    }
  };

  refresh = async (req, res) => {
    const { refreshToken } = req.cookies;
    const accessToken = req.headers.authorization?.split(" ")[1];


    if (!refreshToken || !accessToken) {
      return res.status(401).json({ message: "Refresh error" });
    }

    try {
      const verified = tokentsController.validateRefreshToken(refreshToken);

      if (!verified) {
        return res.status(401).json({ message: "Refresh error" });
      }

      const { username } = verified;
      const user = users.find((user) => user.username === username);

      if (!user) {
        return res.status(401).json({ message: "Refresh error" });
      }

      const tokens = tokentsController.generateTokens({
        role: user.role,
        username: user.username,
      });
      res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
      res.status(200).json({
        username: user.username,
        role: user.role,
        token: tokens.accessToken,
      });
    } catch (e) {
      console.error(e);
      res.status(401).json({ message: "Refresh error" });
    }
  };
}

export default new AuthController();
