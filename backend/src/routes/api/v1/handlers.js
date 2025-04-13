import { generateToken } from "../../../csrf.js";

export async function getCsrfToken(req, res) {
  const csrfToken = generateToken(req, res);
  req.session.init = true;
  res.json({ csrfToken });
}
