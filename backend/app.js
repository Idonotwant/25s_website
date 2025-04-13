import express from "express";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.cookie("theKey", "theValue");
  console.log(req.cookies);
  res.send(req.cookies);
});
app.listen(port, () => {
  console.log(`Example app listening at
http://localhost:${port}`);
});
