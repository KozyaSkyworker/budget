import express from "express";
import router from "./router.js";
import cors from "cors";

const PORT = 4444;

const CORS_OPTIONS = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
};

const app = express();

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use("/", router);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

start();
