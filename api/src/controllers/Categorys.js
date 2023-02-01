const { Category } = require('../models/index')

function getAllCategory(req, res, next) {
    return Category.findAll()
      .then((category) => res.send(category))
      .catch((error) => next(error));
  
}

function getCategoryById(req, res, next) {
    const id = req.params.id
    return Category.findByPk(id)
      .then((category) => res.send(category))
      .catch((error) => next(error));
}
  
function addCategory(req, res, next) {
    const category = req.body
    return Category.create(category) 
      .then((category) => res.send(category))
      .catch((error) => next(error))
}
  
function putCategory(req, res, next) {
    const id = req.params.id
    const category = req.body
    return Category.update(category, {
      where: {
        id,
      },
    }).then((updateCategory) => {
        res.send(updateCategory)
    }).catch((error) => next(error))
};
  
function deleteCategory(req, res, next) {
    const id = req.params.id
    return Category.destroy({
      where: {
        id,
    },
    }).then(() => {
        res.sendStatus(200)
    }).catch((error) => next(error))
};

module.exports = {
    getAllCategory,
    getCategoryById,
    addCategory,
    putCategory,
    deleteCategory

}