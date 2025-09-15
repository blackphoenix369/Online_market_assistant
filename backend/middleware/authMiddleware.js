export default function auth(req, res, next) {
  // Example: check if authorization header exists
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // (Optional) Add real JWT verification logic here
  console.log("Token received:", token);

  // If token is valid → continue
  next();
}
