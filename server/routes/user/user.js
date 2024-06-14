const express = require("express");
const router = express.Router();

const { pool } = require("../../utilities");

router.get("/", async (req, res) => {
  const query = `SELECT * FROM pet`;
  await pool
    .query(query)
    .then((result) => {
      res.status(200).json(result.rows[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
