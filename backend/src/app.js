import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error.js";

const app = express();
dotenv.config({ path: ".env" });

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use(errorMiddleware());

export default app;
