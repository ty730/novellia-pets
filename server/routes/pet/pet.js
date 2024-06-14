const express = require("express");
const router = express.Router();

const { pool } = require("../../utilities");

router.get("/", async (req, res) => {
  const query = `SELECT * FROM pets`;
  await pool
    .query(query)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM pets WHERE id=$1`;
    await pool
      .query(query, [id])
      .then((result) => {
        res.status(200).send(result.rows[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.post("/", async (req, res) => {
    const { name, type, ownerName, dob } = req.body;
    const query = `INSERT INTO pets (name, type, owner_name, dob) VALUES ($1, $2, $3, $4) RETURNING id`;
  
    await pool
      .query(query, [name, type, ownerName, dob])
      .then((result) => {
        const success = result.rowCount === 1;
        const id = result.rows[0].id;
        const message = success ? "Successfully Added Pet" : "Failed to Add Pet";
        res.status(200).json({ success: success, message: message, id: id });
      })
      .catch((err) => {
        console.log(err);
      });
  });

module.exports = router;
