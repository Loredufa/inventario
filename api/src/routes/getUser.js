const { Router } = require('express');
const {getAllUser, getUserById, addUser, putUser, deleteUser} = require('../controllers/Users')
const router = Router();

router.get('/', getAllUser)
router.get('/:id', getUserById)
router.post('/', addUser)
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

module.exports = router;