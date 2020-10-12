function checkFieldsPost(req, res, next) {
  const { username, email, password } = req.body;

  if (username && email && password) {
    next();
  } else {
    // res.status(400);
    res
      .status(400)
      .json({ message: "User Game Form field not can't be empty" });
  }
}

function checkFieldsPostUserGameBiodata(req, res, next) {
  const { fullname, sex, jobs } = req.body;

  if (fullname && sex && jobs) {
    next();
  } else {
    // res.status(400);
    res
      .status(400)
      .json({ message: "User Game Biodata Form field not can't be empty" });
  }
}

function checkFieldsPostUserGameHistory(req, res, next) {
  const { score, comment } = req.body;

  if (score && comment) {
    next();
  } else {
    // res.status(400);
    res
      .status(400)
      .json({ message: "User Game History Form field not can't be empty" });
  }
}

module.exports = {
  checkFieldsPost,
  checkFieldsPostUserGameBiodata,
  checkFieldsPostUserGameHistory,
};
