const express = require("express");
const router = express.Router();

const { pool } = require("../../utilities");

router.post("/", async (req, res) => {
  const { name, administered, petId } = req.body;
  const query = `INSERT INTO vaccines (name, administered, pet_id) VALUES ($1, $2, $3)`;

  await pool
    .query(query, [name, administered, petId])
    .then((result) => {
      const success = result.rowCount === 1;
      const message = success ? "Successfully Added Vaccine" : "Failed to Add Vaccine";
      res.status(200).json({ success: success, message: message });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
