import jwt from 'jsonwebtoken';

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      shopId: user.shopId,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },

    process.env.JWT_SECRET,
    {
      expiresIn: '365d',
    }
  );
};
const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: ' User info entered is not valid' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not suppiled. Please retry' });
  }
};
const isAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'User is not admin' });
  }
};
const isSeller = async (req, res, next) => {
  if (req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: 'User is not seller' });
  }
};

export { signToken, isAuth, isAdmin, isSeller };
