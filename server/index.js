import express from "express";
import router from "./router.js";

const PORT = 4444;

const app = express();

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
