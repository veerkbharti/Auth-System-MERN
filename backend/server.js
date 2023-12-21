import passport from "passport";
import connectDatabase from "./config/db.js";
import app from "./src/app.js";
import initializePassport from "./config/passport.js";
const PORT = process.env.PORT || 4000;

connectDatabase();
initializePassport(passport);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
