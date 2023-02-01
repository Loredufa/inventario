const { Router } = require('express');
const {getAllProvider, getProviderById, addProvider, putProvider, deleteProvider} = require('../controllers/Providers')
const router = Router();

router.get('/', getAllProvider)
router.get('/:id', getProviderById)
router.post('/', addProvider)
router.put('/:id', putProvider);
router.delete('/:id', deleteProvider);

module.exports = router;