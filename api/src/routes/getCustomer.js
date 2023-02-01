const { Router } = require('express');
const {getAllCustomer, getCustomerById, addCustomer, putCustomer, deleteCustomer} = require('../controllers/Customers')
const router = Router();

router.get('/', getAllCustomer)
router.get('/:id', getCustomerById)
router.post('/', addCustomer)
router.put('/:id', putCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;