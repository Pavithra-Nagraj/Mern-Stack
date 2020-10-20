const express = require("express");
const router = express.Router();

const {isSignedIn , isAuthenticated} = require("../controllers/auth");
const { getToken , processpayment} = require("../controllers/paymentB")

router.get("/payment/gettoken/:userId", isSignedIn ,isAuthenticated, getToken)

router.post("/payment/braintree/:userId",isSignedIn,isAuthenticated , processpayment)

module.exports = router;