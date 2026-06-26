import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./router.js";

import { PORT } from "./config.js";

const CORS_OPTIONS = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
};

const app = express();

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(cookieParser());
app.use("/", router);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

start();
