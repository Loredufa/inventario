const { Router } = require('express');
const {getAllCategory, getCategoryById, addCategory, putCategory, deleteCategory} = require('../controllers/Categorys')
const router = Router();

router.get('/', getAllCategory)
router.get('/:id', getCategoryById)
router.post('/', addCategory)
router.put('/:id', putCategory);
router.delete('/:id', deleteCategory);

module.exports = router;