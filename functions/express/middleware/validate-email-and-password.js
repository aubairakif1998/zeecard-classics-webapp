// const isEmail = require("is-email");

// function validateEmailAndPassword(req, res, next) {
//   const { email, password } = req.body;

//   if (!email) {
//     res.status(400).send({ error: { code: "no-email" } });
//     return;
//   }

//   if (!isEmail(email)) {
//     res.status(400).send({ error: { code: "invalid-email" } });
//     return;
//   }

//   if (!password) {
//     res.status(400).send({ error: { code: "no-password" } });
//     return;
//   }

//   next();
// }

// module.exports = validateEmailAndPassword;
const isEmail = require("is-email");

const validateEmailAndPassword = async (req, res, next) => {
  const { email, password, username } = req.body;
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  if (!email) {
    res.status(400).send({ error: { code: "no-email" } });
    return;
  }

  if (!isEmail(email)) {
    res.status(400).send({ error: { code: "invalid-email" } });
    return;
  }

  if (!password) {
    res.status(400).send({ error: { code: "no-password" } });
    return;
  }
  if (!username) {
    res.status(400).send({ error: { code: "no-username" } });
    return;
  }

  if (!USER_REGEX.test(username)) {
    res.status(400).send({ error: { code: "username is not valid" } });
    return;
  }

  // if (!querySnapshot.empty) {
  //   res.status(400).send({ error: { code: "username-already-taken" } });
  //   return;
  // }
  next();
};

module.exports = validateEmailAndPassword;
