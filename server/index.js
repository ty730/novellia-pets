const express = require("express");
const app = express();

const parser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(parser.json());
app.use(cookieParser());

const cors = require("cors");
app.use(cors());

app.use("/api/pet", require("./routes/pet/pet.js"));
app.use("/api/vaccine", require("./routes/pet/vaccine.js"));
app.use("/api/allergy", require("./routes/pet/allergy.js"));
app.use("/api/auth", require("./routes/auth/auth.js"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
