import bcrypt from "bcrypt";

import { SALT } from "../config.js";

export const users = [
  {
    username: "admin",
    password: bcrypt.hashSync("admin", SALT),
    role: "admin",
  },
];

export const tokens = new Map();
