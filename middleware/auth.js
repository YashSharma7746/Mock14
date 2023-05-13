const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token, "mock14");
        if (decoded) {
          req.body.userID = decoded.userID;
          next();
        } else {
          res.status(400).send({ msg: "Please Login First" });
  }
    } else {
      res.status(400).send({ msg: "PLease Login First" });
    }
//   next();
};

module.exports = { auth };
