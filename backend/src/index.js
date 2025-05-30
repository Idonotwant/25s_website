import express from "express";
import session from "express-session";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import rootRouter from "./routes/index.js";
import { prisma } from "./adapters.js";
import cookieParser from "cookie-parser";
import { csrfErrorHandler, doubleCsrfProtection } from "./csrf.js";

const port = process.env.PORT || 8000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendDir = path.join(__dirname, "../../frontend/dist");

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
app.use(cookieParser());
app.use(express.static(frontendDir));
app.use(
  session({
    cookie: {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: null, // session cookie
    },
    // use random secret
    name: "eicmmwbozkduwsc", // don't omit this option
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(doubleCsrfProtection);
app.use(csrfErrorHandler);
app.use(rootRouter);

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

process.on("exit", async () => {
  await prisma.$disconnect();
});
