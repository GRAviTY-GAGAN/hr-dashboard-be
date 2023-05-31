function userAuth(req, res, next) {
  console.log("COMMING FROM SIGNUP");
  const { phoneNumber } = req.body;
  console.log(phoneNumber + "PHONE", req.body);
  next();
}

module.exports = { userAuth };
