const UserGame = require("../Models/user/user-game");
const UserGameBiodata = require("../Models/user/user-game-biodata");
const UserGameHistory = require("../Models/user/user-game-history");

module.exports = {
  // render view dashboard
  viewDashboard: async (req, res) => {
    try {
      const usergame = await UserGame.find();
      const userbiodata = await UserGameBiodata.find();
      const userhistory = await UserGameHistory.find();
      res.render("admin/dashboard", {
        usergame,
        userbiodata,
        userhistory,
      });
    } catch (error) {
      res.redirect("/admin/dashboard");
    }
  },

  // render view sign in
  viewSignin: (req, res) => {
    res.render("admin/index");
  },

  // render user list on dashboard
  renderAllUserGame: (req, res) => {
    UserGame.find()
      .then((usergame) => {
        res.render("admin/dashboard", {
          usergame,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "something error to get all user",
        });
      });
  },

  // create and save a new user game
  createUserGame: (req, res) => {
    // create user
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    // console.log(user);

    UserGame.create(user)
      .then((data) => {
        // res.send(data);
        res.redirect("dashboard");
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "found error while creating user",
        });
      });
  },

  // get one user by id
  getOneUserGame: (req, res) => {
    const { id } = req.params;

    UserGame.findOne({ _id: id })
      .then((data) => {
        if (data == data) {
          res.status(200).send(data);
        } else {
          res.status(200).send({
            message: `id = ${id} maybe was deleted`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "no user with" + id,
        });
      });
  },

  // get all user
  getAllUserGame: (req, res) => {
    UserGame.find() // find is function bawaan Mongoose
      .then((data) => {
        res.send(data);
        console.log(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "something error to get all user",
        });
      });
  },

  // User Game
  //
  // update user by id
  updateUserGame: (req, res) => {
    const { id } = req.params;

    const updateOneUserGame = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };

    UserGame.findByIdAndUpdate(id, updateOneUserGame, (error, result) => {
      if (error) {
        res.send({
          message:
            error ||
            `can't update user game biodata with id=${id} maybe req.body is mty`,
        });
      } else {
        // res.send({
        //   message: `user game biodata with id=${id} was upadated successfully`,
        // });
        res.redirect("/admin/dashboard");
      }
    });
  },

  // delete user by id
  deleteOneUserGame: (req, res) => {
    const { id } = req.params;

    const removeOneUserGame = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    UserGame.findByIdAndRemove(id, removeOneUserGame, (error, result) => {
      if (error) {
        res.send({
          message:
            error ||
            `can't update user game biodata with id=${id} maybe req.body is mty`,
        });
      } else {
        // res.send({
        //   message: `user game biodata with id=${id} was deleted successfully`,
        // });
        res.redirect("/admin/dashboard");
      }
    });
  },

  // delete all user
  deleteAllUserGame: (req, res) => {
    UserGame.deleteMany()
      .then(
        UserGame.count({}, (err, result) => {
          if (err) {
            res.send({
              message: err || "something get error",
            });
          } else {
            res.send({
              message: `${result} user game data was deleted successfully`,
            });
          }
        })
      )
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Delete all failed",
        });
      });
  },

  // User Game Biodata
  //
  // create and save a new user game history
  createUserGameBiodata: (req, res) => {
    const usergamebiodata = {
      fullname: req.body.fullname,
      sex: req.body.sex,
      jobs: req.body.jobs,
      user_id: req.body.user_id,
    };

    console.log(usergamebiodata);

    UserGameBiodata.create(usergamebiodata)
      .then((data) => {
        // res.send(data);
        res.redirect("dashboard");
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "found error while creating user game biodata",
        });
      });
  },

  // get one user by id
  getOneUserGameBiodata: (req, res) => {
    const { id } = req.params;

    UserGameBiodata.findOne({ _id: id })
      .then((data) => {
        if (data == data) {
          res.status(200).send(data);
        } else {
          res.status(200).send({
            message: `id = ${id} maybe was deleted`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "no user game biodata with" + id,
        });
      });
  },

  // get all user
  getAllUserGameBiodata: (req, res) => {
    UserGameBiodata.find() // find is function bawaan Mongoose
      .then((data) => {
        res.send(data);
      })
      .then(() => {
        const showUserBiodataRelation = async () => {
          const UserBiodata = await UserGameBiodata.find()
            .populate("user_id", "-_id -__v")
            .select("-__v");

          console.log(
            "User Biodata With Reference detail:\n",
            `\x1b[93m${UserBiodata}\x1b[39m\n`
          );
        };
        return showUserBiodataRelation();
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "something error to get all user game biodata",
        });
      });
  },

  // update user game history by id
  updateUserGameBiodata: (req, res) => {
    const { id } = req.params;

    const updateOneUserBiodata = {
      fullname: req.body.fullname,
      sex: req.body.sex,
      jobs: req.body.jobs,
      user_id: req.body.user_id,
    };

    UserGameBiodata.findByIdAndUpdate(
      id,
      updateOneUserBiodata,
      (error, result) => {
        if (error) {
          res.send({
            message:
              error ||
              `can't update user game biodata with id=${updateOneUserBiodata} maybe req.body is mty`,
          });
        } else {
          // res.send({
          //   message: `user game biodata with id=${id} was upadated successfully`,
          // });
          res.redirect("/admin/dashboard");
        }
      }
    );
  },

  // delete user game history by id
  deleteOneUserGameBiodata: (req, res) => {
    const { id } = req.params;

    const removeOneUserBiodata = {
      fullname: req.body.fullname,
      sex: req.body.sex,
      jobs: req.body.jobs,
      user_id: req.body.user_id,
    };

    UserGameBiodata.findByIdAndRemove(
      id,
      removeOneUserBiodata,
      (error, result) => {
        if (error) {
          res.send({
            message:
              error ||
              `can't update user game biodata with id=${removeOneUserBiodata} maybe req.body is mty`,
          });
        } else {
          // res.send({
          //   message: `user game biodata with id=${id} was deleted successfully`,
          // });
          res.redirect("/admin/dashboard");
        }
      }
    );
  },

  // delete all user game history
  deleteAllUserGameBiodata: (req, res) => {
    UserGameBiodata.deleteMany()
      .then(
        UserGameBiodata.count({}, (err, result) => {
          if (err) {
            res.send({
              message: err || "something get error",
            });
          } else {
            res.send({
              message: `${result} user game biodata data was deleted successfully`,
            });
          }
        })
      )
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Delete all failed",
        });
      });
  },

  // User Game History
  //
  // create and save a new user game history
  createUserGameHistory: (req, res) => {
    // create user
    const usergamehistory = {
      score: req.body.score,
      comment: req.body.comment,
      user_id: req.body.user_id,
    };

    UserGameHistory.create(usergamehistory)
      .then((data) => {
        // res.send(data);
        res.redirect("dashboard");
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "found error while creating user game history",
        });
      });
  },

  // get one user by id
  getOneUserGameHistory: (req, res) => {
    const { id } = req.params;

    UserGameHistory.findOne({ _id: id })
      .then((data) => {
        if (data == data) {
          res.status(200).send(data);
        } else {
          res.status(200).send({
            message: `id = ${id} maybe was deleted`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "no user game history with" + id,
        });
      });
  },

  // get all user
  getAllUserGameHIstory: (req, res) => {
    UserGameHistory.find() // find is function bawaan Mongoose
      .then((data) => {
        res.send(data);
      })
      .then(() => {
        const showUserHistoryRelation = async () => {
          const UserHistory = await UserGameHistory.find()
            .populate("user_id", "-_id -__v")
            .select("-__v");

          console.log(
            "User History With Reference detail:\n",
            `\x1b[93m${UserHistory}\x1b[39m\n`
          );
        };
        return showUserHistoryRelation();
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "something error to get all user game history",
        });
      });
  },

  // update user game history by id
  updateUserGameHistory: (req, res) => {
    const { id } = req.params;

    const updateOneUserHistory = {
      score: req.body.score,
      comment: req.body.comment,
      user_id: req.body.user_id,
    };

    UserGameHistory.findByIdAndUpdate(
      id,
      updateOneUserHistory,
      (error, result) => {
        if (error) {
          res.send({
            message:
              error ||
              `can't update user game biodata with id=${updateOneUserHistory} maybe req.body is mty`,
          });
        } else {
          // res.send({
          //   message: `user game biodata with id=${id} was upadated successfully`,
          // });
          res.redirect("/admin/dashboard");
        }
      }
    );
  },

  // delete user game history by id
  deleteOneUserGameHistory: (req, res) => {
    const { id } = req.params;

    const removeOneUserHistory = {
      score: req.body.score,
      comment: req.body.comment,
      user_id: req.body.user_id,
    };

    UserGameHistory.findByIdAndDelete(
      id,
      removeOneUserHistory,
      (error, result) => {
        if (error) {
          res.send({
            message:
              error ||
              `can't update user game biodata with id=${removeOneUserHistory} maybe req.body is mty`,
          });
        } else {
          // res.send({
          //   message: `user game biodata with id=${id} was deleted successfully`,
          // });
          res.redirect("/admin/dashboard");
        }
      }
    );
  },

  // delete all user game history
  deleteAllUserGameHistory: (req, res) => {
    UserGameHistory.deleteMany()
      .then(
        UserGameHistory.count({}, (err, result) => {
          if (err) {
            res.send({
              message: err || "something get error",
            });
          } else {
            res.send({
              message: `${result} user game history data was deleted successfully`,
            });
          }
        })
      )
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Delete all failed",
        });
      });
  },
};
