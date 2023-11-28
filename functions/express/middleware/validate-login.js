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

const validateLoginDetails = async (req, res, next) => {
  const { email, password, username } = req.body;

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

  // if (!querySnapshot.empty) {
  //   res.status(400).send({ error: { code: "username-already-taken" } });
  //   return;
  // }
  next();
};

module.exports = validateLoginDetails;
