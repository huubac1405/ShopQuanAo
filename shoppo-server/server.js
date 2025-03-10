require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use("/uploads", express.static("public/uploads"));

console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

//Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use(bodyParser.json())
routes(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
