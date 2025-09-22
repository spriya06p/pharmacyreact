const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const h = req.headers.authorization;
  if(!h) return res.status(401).json({ error: 'No token' });
  const token = h.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const requireRole = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
  next();
};

module.exports = { auth, requireRole };
