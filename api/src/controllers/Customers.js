const { Customer } = require('../models/index')

function getAllCustomer(req, res, next) {
    return Customer.findAll()
      .then((customer) => res.send(customer))
      .catch((error) => next(error));
  
}

function getCustomerById(req, res, next) {
    const id = req.params.id
    return Customer.findByPk(id)
      .then((customer) => res.send(customer))
      .catch((error) => next(error));
}
  
function addCustomer(req, res, next) {
    const customer = req.body
    return Customer.create(customer) 
      .then((customer) => res.send(customer))
      .catch((error) => next(error))
}
  
function putCustomer(req, res, next) {
    const id = req.params.id
    const customer = req.body
    return Customer.update(customer, {
      where: {
        id,
      },
    }).then((updateCustomer) => {
        res.send(updateCustomer)
    }).catch((error) => next(error))
};
  
function deleteCustomer(req, res, next) {
    const id = req.params.id
    return Customer.destroy({
      where: {
        id,
    },
    }).then(() => {
        res.sendStatus(200)
    }).catch((error) => next(error))
};

module.exports = {
    getAllCustomer,
    getCustomerById,
    addCustomer,
    putCustomer,
    deleteCustomer

}