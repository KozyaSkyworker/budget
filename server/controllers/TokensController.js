import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import { tokens } from "../data/index.js";

class TokensController {
  generateTokens = ({ username, role }) => {
    const payload = {
      username,
      role,
    };

    const accessToken = jwt.sign(payload, SECRET, { expiresIn: "15s" });
    const refreshToken = jwt.sign(payload, SECRET, { expiresIn: "1d" });

    // tokens.set(refreshToken, username);
    // this.tokens.set(username, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  };

  validateRefreshToken = (refreshToken) => {
    try {
      const verified = jwt.verify(refreshToken, SECRET);
      return verified;
    } catch (e) {
      return null;
    }
  };
}

export default new TokensController();
