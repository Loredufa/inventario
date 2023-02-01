const { Purchase } = require('../models/index')

function getAllPurchase(req, res, next) {
    return Purchase.findAll()
      .then((purchase) => res.send(purchase))
      .catch((error) => next(error));
  
}

function getPurchaseById(req, res, next) {
    const id = req.params.id
    return Purchase.findByPk(id)
      .then((purchase) => res.send(purchase))
      .catch((error) => next(error));
}
  
function addPurchase(req, res, next) {
    const purchase = req.body
    return Purchase.create(purchase) 
      .then((purchase) => res.send(purchase))
      .catch((error) => next(error))
}
  
function putPurchase (req, res, next) {
    const id = req.params.id
    const purchase = req.body
    return Purchase.update(purchase, {
      where: {
        id,
      },
    }).then((updatePurchase) => {
        res.send(updatePurchase)
    }).catch((error) => next(error))
};
  
function deletePurchase (req, res, next) {
    const id = req.params.id
    return Purchase.destroy({
      where: {
        id,
    },
    }).then(() => {
        res.sendStatus(200)
    }).catch((error) => next(error))
};

module.exports = {
    getAllPurchase,
    getPurchaseById,
    addPurchase,
    putPurchase,
    deletePurchase

}