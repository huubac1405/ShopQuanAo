const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");

router.post("/add", cartController.addToCart);
router.get("/:userId", cartController.getCart);
router.put("/update", cartController.updateCartItem)
router.delete("/delete", cartController.deleteCartItem)


module.exports = router;
