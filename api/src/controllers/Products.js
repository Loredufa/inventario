const { Product } = require('../models/index')

function getAllProduct(req, res, next) {
    return Product.findAll()
      .then((product) => res.send(product))
      .catch((error) => next(error));
  
}

function getProductById(req, res, next) {
    const id = req.params.id
    return Product.findByPk(id)
      .then((product) => res.send(product))
      .catch((error) => next(error));
}
  
function putProduct(req, res, next) {
    const id = req.params.id
    const product = req.body
    return Product.update(product, {
      where: {
        id,
      },
    }).then((updateProduct) => {
        res.send(updateProduct)
    }).catch((error) => next(error))
};
  
function deleteProduct(req, res, next) {
    const id = req.params.id
    return Product.destroy({
      where: {
        id,
    },
    }).then(() => {
        res.sendStatus(200)
    }).catch((error) => next(error))
};


module.exports = {
    getAllProduct,
    getProductById,
    putProduct,
    deleteProduct

}