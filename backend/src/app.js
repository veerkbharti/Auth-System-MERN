import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: ".env" });


app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});


export default app;
