import connectDatabase from "./config/db.js";
import app from "./src/app.js";
const PORT = process.env.PORT || 4000;

connectDatabase();

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
