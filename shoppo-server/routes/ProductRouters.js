const express = require("express");
const router = express.Router()
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");
const productController = require('../controllers/ProductController')

router.post('/create',productController.createProduct)
router.put('/update/:id',productController.updateProduct)
router.delete('/delete/:id',productController.deleteProduct)
router.get('/getAll',productController.getAllProduct)
router.get('/getById/:id',productController.getProductById)

module.exports = router