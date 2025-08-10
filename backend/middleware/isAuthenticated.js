import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Authentication failed." });
  }
};

export default isAuthenticated;
