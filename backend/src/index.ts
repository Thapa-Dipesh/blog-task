import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";

// use route
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
