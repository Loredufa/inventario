const { Move } = require('../models/index')

function getAllMove(req, res, next) {
    return Move.findAll()
      .then((move) => res.send(move))
      .catch((error) => next(error));
  
}

function getMoveById(req, res, next) {
    const id = req.params.id
    return Move.findByPk(id)
      .then((move) => res.send(move))
      .catch((error) => next(error));
}
  
function addMove(req, res, next) {
    const move = req.body
    return Move.create(move) 
      .then((move) => res.send(move))
      .catch((error) => next(error))
}
  
function putMove(req, res, next) {
    const id = req.params.id
    const move = req.body
    return Move.update(move, {
      where: {
        id,
      },
    }).then((updateMove) => {
        res.send(updateMove)
    }).catch((error) => next(error))
};
  
function deleteMove(req, res, next) {
    const id = req.params.id
    return Move.destroy({
      where: {
        id,
    },
    }).then(() => {
        res.sendStatus(200)
    }).catch((error) => next(error))
};

module.exports = {
    getAllMove,
    getMoveById,
    addMove,
    putMove,
    deleteMove

}