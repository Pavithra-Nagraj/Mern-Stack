const express = require("express");
const router = express.Router();

const {isSignedIn,isAuthenticated , isAdmin} = require("../controllers/auth")
const {updateStock} = require("../controllers/product")
const {getUserById ,pushOrderInPurchaseList } = require("../controllers/user")
const {getOrderById ,createOrder ,getAllOrders ,getOrderStatus , updateStatus} = require("../controllers/order")


//params
router.param("userId", getUserById);
router.param("orderId" , getOrderById);

//actual routes
router.post('/order/create/:userId', isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock , createOrder)

//get all orders
router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin , getAllOrders)
//status 
router.get("/order/status/:userId" , isSignedIn , isAuthenticated , isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin, updateStatus)
module.exports = router;