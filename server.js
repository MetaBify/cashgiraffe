const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=300");
  next();
});

const staticDir = express.static(path.join(__dirname, "public"));

app.use("/rewards", staticDir);

app.get("/", (_, res) => {
  res.redirect(302, "/rewards");
});

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`CashGiraffe landing page running on port ${PORT}`);
});
