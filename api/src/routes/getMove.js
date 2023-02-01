const { Router } = require('express');
const {getAllMove, getMoveById, addMove, putMove, deleteMove} = require('../controllers/Moves')
const router = Router();

router.get('/', getAllMove)
router.get('/:id', getMoveById)
router.post('/', addMove)
router.put('/:id', putMove);
router.delete('/:id', deleteMove);

module.exports = router;