import bcrypt from "bcrypt";

const SALT = 9;

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
          .send({ message: "Username and password are required" });
      }

      const candidate = this.users.find((user) => user.username === username);

      if (!candidate) {
        return res
          .status(400)
          .send({ message: "Username or password is wrong" });
      }

      console.table(candidate);

      if (!bcrypt.compareSync(password, candidate.password)) {
        return res
          .status(400)
          .send({ message: "Username or password is wrong" });
      }

      res.status(200).json({
        username: candidate.username,
        role: candidate.role,
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Login error" });
    }
  };

  registration = async (req, res) => {
    try {
      const { username, password } = req.body;

      if (this.users.find((user) => user.username === username)) {
        return res.status(400).send({ message: "Username already exists" });
      }

      this.users.push({
        username,
        password: bcrypt.hashSync(password, SALT),
        role: "user",
      });

      res.send(`${username} was successfully registered`);
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
