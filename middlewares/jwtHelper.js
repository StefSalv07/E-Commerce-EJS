const jwt = require("jsonwebtoken");
const secret = "secret";
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, // Payload
    process.env.JWT_SECRET || "cfbsdjhgtf", // Secret key
    { expiresIn: "1h" } // Token expiration
  );
};
const validateToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
  } catch {
    return null;
  }
};

module.exports = { generateToken, validateToken };
