const express = require("express");
const cors = require("cors");
const chirpsRouter = require("./routes/chirps");

let app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chirps", chirpsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server runing on ${PORT}`));
