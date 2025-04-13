import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const port = process.env.PORT || 8000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendDir = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendDir));
app.get("*", (req, res) => {
  // Keep as the last route
  if (!req.originalUrl.startsWith("/api")) {
    return res.sendFile(path.join(frontendDir, "index.html"));
  }
  return res.status(404).send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
