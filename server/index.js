import express from "express";
import cors from "cors";
import Manager from "./router/ManagerRout.js";
import Employee from "./router/EmplyeeRout.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/auth", Manager);
app.use("/employee", Employee);

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: false, message: "Wrong Token" });
      }
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } else {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }
};
app.get("/verify", verifyUser, (req, res) => {
  res.json({ status: true, role: req.role, id: req.id });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
