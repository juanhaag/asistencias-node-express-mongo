const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //const token = req.header("auth-token");
  const token = req.query.token||req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.profesor = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token no valido" });
  }
};

module.exports = verifyToken;
