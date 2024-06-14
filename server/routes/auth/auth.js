const express = require("express");
const router = express.Router();

const { pool } = require("../../utilities");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const crypto = require("crypto");

const generateHash = (pw, salt) =>
  crypto
    .createHash("sha256")
    .update(pw + salt)
    .digest("hex");

const generateSalt = () => crypto.randomBytes(32).toString("hex");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const salt = generateSalt(32);
  const hash = generateHash(password, salt);

  const query = `INSERT INTO users (username, password, salt) 
                 VALUES ($1, $2, $3) 
                 RETURNING *`;

  await pool
    .query(query, [username, hash, salt])
    .then((result) => {
      // a verified user already exists for this email
      if (result.rowCount === 0) {
        res.status(400).send({
          success: false,
          message: "Email Already Exists",
        });
        return;
      }

      const id = result.rows[0].id;
      const token = jwt.sign(
        {
          id: id,
          username: username,
        },
        `${process.env.JWTSECRET}`
      );

      res.cookie("token", token);

      res.status(200).send({
        success: true,
        message: "User Registered Successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: false,
        message: "User Could Not Be Registered",
      });
    });
});

router.get("/", async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).json({
      success: false,
      message: "Missing Authorization Header",
    });
    return;
  }

  const base64Credentials = req.headers.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");

  const query = `SELECT * from users where username=$1`;
  const values = [username];

  pool
    .query(query, values)
    .then((result) => {
      if (result.rowCount == 0) {
        res.status(404).send({
          success: false,
          message: "User Not Found",
        });
        return;
      }

      // get salt, hashed password, and compute expected hashed password
      const salt = result.rows[0].salt;
      const hash = result.rows[0].password;
      const expectedHash = generateHash(password, salt);

      // compare hashed passwords
      if (hash === expectedHash) {
        const token = jwt.sign(
          {
            id: result.rows[0].id,
            username: result.rows[0].username,
          },
          `${process.env.JWTSECRET}`
        );

        res.cookie("token", token);

        res.status(201).send({
          success: true,
          message: "Login Successful",
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Credentials Did Not Match",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        success: false,
        message: err.detail,
      });
    });
});

module.exports = router;
