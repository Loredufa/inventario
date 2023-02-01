const { Provider } = require('../models/index')

function getAllProvider(req, res, next) {
    return Provider.findAll()
      .then((provider) => res.send(provider))
      .catch((error) => next(error));
  
}

function getProviderById(req, res, next) {
    const id = req.params.id
    return Provider.findByPk(id)
      .then((provider) => res.send(provider))
      .catch((provider) => next(error));
}
  
function addProvider(req, res, next) {
    const provider = req.body
    return Provider.create(provider) 
      .then((provider) => res.send(provider))
      .catch((error) => next(error))
}
  
function putProvider(req, res, next) {
    const id = req.params.id
    const provider = req.body
    return Provider.update(provider, {
      where: {
        id,
      },
    }).then((updateProvider) => {
        res.send(updateProvider)
    }).catch((error) => next(error))
};
  
function deleteProvider(req, res, next) {
    const id = req.params.id
    return Provider.destroy({
      where: {
        id,
    },
    }).then(() => {
        res.sendStatus(200)
    }).catch((error) => next(error))
};

module.exports = {
    getAllProvider,
    getProviderById,
    addProvider,
    putProvider,
    deleteProvider

}