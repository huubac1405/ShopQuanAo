const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

router.post('/register',userController.createUser)
router.post('/login',userController.loginUser)
router.put('/update/:id',userController.updateUser)
router.delete('/delete/:id',authMiddleware,userController.deleteUser)
router.get('/getAll',authMiddleware,userController.getAllUser)
router.get('/getById/:id',authUserMiddleware,userController.getUserById)
router.post('/refresh-token',userController.refreshToken)




module.exports = router