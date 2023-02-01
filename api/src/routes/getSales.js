const { Router } = require('express');
const { Sale } = require('../models/index')
const {getAllSale, getSaleById, addSale, putSale, deleteSale} = require('../controllers/sales')
const router = Router();

router.get('/', getAllSale)
router.get('/:id', getSaleById)
router.post('/', addSale)
router.put('/:id', putSale);
router.delete('/:id', deleteSale);

module.exports = router;