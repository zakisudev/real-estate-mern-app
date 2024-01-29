const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token)
    return res.status(401).json({ msg: 'Authorization Error', status: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid Token' });
  }
};

module.exports = verifyUser;
