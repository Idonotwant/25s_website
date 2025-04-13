import { doubleCsrf } from "csrf-csrf";
const isProd = process.env.NODE_ENV === "production";
export const {
  invalidCsrfTokenError,
  generateToken, // Use this in your routes to provide a CSRF hash cookie and token.
  validateRequest, // Also a convenience if you plan on making your own middleware.
  doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({
  getSecret: (req) => req.session.id,
  // The name of the cookie to be used, recommend using __Host- prefix.
  cookieName: `${isProd ? "__Host-" : ""}csrf`,
  cookieOptions: {
    httpOnly: true,
    sameSite: "strict", // Recommend you make this strict if posible
    path: "/",
    secure: isProd,
  },
  size: 64, // The size of the generated tokens in bits
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
  // A function that returns the token from the request
  getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});
export function csrfErrorHandler(error, req, res, next) {
  if (error == invalidCsrfTokenError) {
    res.status(403).json({
      error: "invalid csrf token",
    });
  } else {
    next();
  }
}
