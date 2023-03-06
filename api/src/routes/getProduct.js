const { Router } = require('express');
const { Product } = require('../models/index')
const {getAllProduct, getProductById, putProduct, deleteProduct,  putProductList} = require('../controllers/Products')
const {addProduct} = require('../controllers/Create')
const router = Router();

router.get('/', getAllProduct)
router.get('/:id', getProductById)
router.post('/', addProduct)  
router.put('/:id', putProduct);
router.put('/', putProductList);
router.delete('/:id', deleteProduct);


module.exports = router;