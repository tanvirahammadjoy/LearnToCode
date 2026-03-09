import app from "./app.js";
import connectToDatabase from "./db/db.js";

// Connect to the database
connectToDatabase();
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
