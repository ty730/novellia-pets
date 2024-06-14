const express = require("express");
const router = express.Router();

const { pool } = require("../../utilities");

router.post("/", async (req, res) => {
  const { name, reaction, severity, petId } = req.body;
  const query = `INSERT INTO allergies (name, reaction, severity, pet_id) VALUES ($1, $2, $3, $4)`;

  await pool
    .query(query, [name, reaction, severity, petId])
    .then((result) => {
      const success = result.rowCount === 1;
      const message = success ? "Successfully Added Allergy" : "Failed to Add Allergy";
      res.status(200).json({ success: success, message: message });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
