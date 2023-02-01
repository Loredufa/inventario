const { Router } = require('express');
const { Purchase } = require('../models/index')
const {getAllPurchase, getPurchaseById, addPurchase, putPurchase, deletePurchase} = require('../controllers/Purchases')
const router = Router();

router.get('/', getAllPurchase)
router.get('/:id', getPurchaseById)
router.post('/', addPurchase)
router.put('/:id', putPurchase);
router.delete('/:id', deletePurchase);

module.exports = router;