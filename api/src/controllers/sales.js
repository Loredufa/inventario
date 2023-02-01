const { Sale } = require('../models/index')

function getAllSale(req, res, next) {
    return Sale.findAll()
      .then((sales) => res.send(sales))
      .catch((error) => next(error));
  
}

function getSaleById(req, res, next) {
    const id = req.params.id
    return Sale.findByPk(id)
      .then((sales) => res.send(sales))
      .catch((error) => next(error));
}
  
function addSale(req, res, next) {
    const sale = req.body
    return Sale.create(sale) 
      .then((sale) => res.send(sale))
      .catch((error) => next(error))
}
  
function putSale (req, res, next) {
    const id = req.params.id
    const sale = req.body
    return Sale.update(sale, {
      where: {
        id,
      },
    }).then((updateSale) => {
        res.send(updateSale)
    }).catch((error) => next(error))
};
  
function deleteSale (req, res, next) {
    const id = req.params.id
    return Sale.destroy({
      where: {
        id,
    },
    }).then(() => {
        res.sendStatus(200)
    }).catch((error) => next(error))
};

module.exports = {
    getAllSale,
    getSaleById,
    addSale,
    putSale,
    deleteSale

}