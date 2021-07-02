const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.get("/get", (req, res) => {
  res.json({ status: "success", message: "Welcome To Testing API" });
});

app.post("/post", (req, res) => {
  res.json({
    status: "success",
    message: "Ok",
  });
});

app.put("/put", (req, res) => {
  console.log(req.body)
  res.json({
    status: "success",
    message: "Ok",
  });
});

app.delete("/delete", (req, res) => {
  res.json({
    status: "success",
    message: "Ok",
  });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

module.exports = app;
