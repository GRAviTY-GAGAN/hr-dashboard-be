function userAuth(req, res, next) {
  const { phoneNumber } = req.body;
  if (phoneNumber.length !== 10) {
    res.status(400).json({ msg: "Please enter proper phone number" });
  } else {
    next();
  }
}

module.exports = { userAuth };
