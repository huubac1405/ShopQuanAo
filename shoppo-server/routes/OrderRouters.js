const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

router.post("/create", orderController.createOrder);
router.get("/getAll", orderController.getAllOrders);
router.get("/:userId", orderController.getOrdersByUser);
router.put("/status", orderController.updateOrderStatus);
router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;
