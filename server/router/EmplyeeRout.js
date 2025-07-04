import express from "express";
import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = express.Router();
router.get("/a", (req, res) => {
  res.json({ message: "Welcome to the Employee Management API!" });
});
router.post("/employeelogin", (req, res) => {
  const sql = "SELECT * FROM employee WHERE email = ? ";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ loginstatus: false, message: "Qurey error" });
    }
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err) {
          return res.json({ loginstatus: false, message: "Qurey error" });
        }
        if (response) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: "employee", email: email, id: result[0].idemployee },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({
            loginstatus: true,
            id: result[0].idemployee,
          });
        }
      });
    } else {
      return res.json({
        loginstatus: false,
        message: "Invalid email or password",
      });
    }
  });
});
router.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE idemployee = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ status: false, message: "Query error" });

    return res.json({ status: true, Result: result });
  });
});

router.post("/attendance/:id", (req, res) => {
  const { status } = req.body;
  const id = req.params.id;
  const today = new Date().toISOString().split("T")[0];

  if (!id || !status) {
    return res
      .status(400)
      .json({ error: "Employee ID and status are required." });
  }

  const query = `INSERT INTO attendance (idemployee, date, status)
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE status = VALUES(status)`;

  db.query(query, [id, today, status], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }
    res.json({ message: "Attendance updated successfully!", result });
  });
});

router.get("/attendance/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT e.idemployee, e.name, a.date, a.status
                 FROM employee e
                 JOIN attendance a ON e.idemployee = a.idemployee
                 WHERE e.idemployee = ? 
                 ORDER BY a.date DESC`;

  db.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No attendance records found for this employee." });
    }

    res.json({ results, message: "Attendance display successfully!" });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "Logout successfully" });
});
export default router;
