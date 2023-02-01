const { User } = require('../models/index')

function getAllUser(req, res, next) {
    return User.findAll()
      .then((user) => res.send(user))
      .catch((error) => next(error));
  
}

function getUserById(req, res, next) {
    const id = req.params.id
    return User.findByPk(id)
      .then((user) => res.send(user))
      .catch((error) => next(error));
}
  
function addUser(req, res, next) {
    const user = req.body
    return User.create(user) 
      .then((user) => res.send(user))
      .catch((error) => next(error))
}
  
function putUser(req, res, next) {
    const id = req.params.id
    const user = req.body
    return User.update(user, {
      where: {
        id,
      },
    }).then((updateUser) => {
        res.send(updateUser)
    }).catch((error) => next(error))
};
  
function deleteUser(req, res, next) {
    const id = req.params.id
    return User.destroy({
      where: {
        id,
    },
    }).then(() => {
        res.sendStatus(200)
    }).catch((error) => next(error))
};

module.exports = {
    getAllUser,
    getUserById,
    addUser,
    putUser,
    deleteUser

}