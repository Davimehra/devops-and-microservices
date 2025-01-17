const app = require("express")();

app.get("/", (req, res, next) => {
  res.json({ message: "Working Fine" });
});

app.listen(5000, () => {
  console.log("Listening to 5000");
});
