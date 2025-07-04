import express from "express";
import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = express.Router();
router.post("/managerlogin", (req, res) => {
  const sql = "SELECT * FROM manager WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ loginstatus: false, message: "Qurey error" });
    }
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "manager", email: email, id: result[0].idmanger },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginstatus: true });
    } else {
      return res.json({
        loginstatus: false,
        message: "Invalid email or password",
      });
    }
  });
});

router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  db.query(sql, (err, result) => {
    if (err) return res.json({ status: false, message: "Query error" });

    return res.json({ status: true, Result: result });
  });
});
router.post("/addcategory", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  db.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ status: false, message: "Query error" });

    return res.json({ status: true, message: "Category added successfully" });
  });
});

router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  db.query(sql, (err, result) => {
    if (err) return res.json({ status: false, message: "Query error" });

    return res.json({ status: true, Result: result });
  });
});
router.post("/addemployee", (req, res) => {
  const checkSql = "SELECT * FROM employee WHERE email = ?";
  db.query(checkSql, [req.body.email], (err, result) => {
    if (err) return res.json({ status: false, message: "Query error" });

    if (result.length > 0) {
      return res.json({
        status: false,
        message: "Employee with this email already exists",
      });
    }

    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
      if (err)
        return res.json({ status: false, message: "Password hashing error" });

      const sql =
        "INSERT INTO employee (`name`, `email`, `password`, `salary`, `address`, `idcategory`) VALUES (?)";
      const values = [
        req.body.name,
        req.body.email,
        hash,
        req.body.salary,
        req.body.address,
        req.body.idcategory,
      ];

      db.query(sql, [values], (err, result) => {
        if (err) return res.json({ status: false, message: err });

        return res.json({
          status: true,
          message: "Employee added successfully",
        });
      });
    });
  });
});
router.delete("/deleteemployee/:id", (req, res) => {
  const sql = "DELETE FROM employee WHERE idemployee = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.json({ status: false, message: "Query error" });

    return res.json({
      status: true,
      message: "Employee deleted successfully",
    });
  });
});
router.get("/searchemployee", (req, res) => {
  const searchTerm = req.query.q;
  const sql = "SELECT * FROM employee WHERE name LIKE ?  ";

  db.query(sql, [`%${searchTerm}%`, `%${searchTerm}%`], (err, result) => {
    if (err) return res.json({ status: false, message: "Query error" });

    return res.json({ status: true, Result: result });
  });
});
router.get("/manager_total", (req, res) => {
  const sql = "SELECT COUNT(idmanger) AS manager_count FROM manager";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({ status: false, message: "Query error", error: err });
    }

    return res.json({ status: true, result: result[0] });
  });
});
router.get("/employee_total", (req, res) => {
  const sql = "SELECT COUNT(idemployee) AS employee_count FROM employee";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({ status: false, message: "Query error", error: err });
    }

    return res.json({ status: true, result: result[0] });
  });
});

router.get("/category_total", (req, res) => {
  const sql = "SELECT COUNT(idcategory) AS category_count FROM category";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({ status: false, message: "Query error", error: err });
    }

    return res.json({ status: true, result: result[0] });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "Logout successfully" });
});
router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE idemployee = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ status: false, message: "Query error" });
    return res.json({ status: true, Result: result });
  });
});
router.put("/employee_edit/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE employee SET name = ?, email = ?, salary = ?, address = ? WHERE idemployee = ?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ status: false, message: "Query error" });
    return res.json({ status: true, message: "Employee updated successfully" });
  });
});
export default router;
