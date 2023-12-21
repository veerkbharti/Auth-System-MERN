import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error.js";
import passport from "passport";
import cors from 'cors'

const app = express();
dotenv.config({ path: ".env" });
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Passport middleware initialization
app.use(passport.initialize({ session: false }));


app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

import auth from "./routes/auth.routes.js";

const routePrefix = "/api/v1";
app.use(routePrefix, auth);

app.use(errorMiddleware);

export default app;
