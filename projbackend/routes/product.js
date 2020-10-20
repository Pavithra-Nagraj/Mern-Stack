const express = require("express");
const router = express.Router();

const { getProductById ,createProduct ,getProduct ,photo ,deleteProduct ,updateProduct,
    getAllProducts ,getAllUniqueCategories} = require("../controllers/product");
const {isAdmin , isAuthenticated ,isSignedIn} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

router.param("userId" , getUserById)
router.param("productId" ,getProductById);


//my routes for product
router.post("/product/create/:userId" , isSignedIn ,isAuthenticated, isAdmin, createProduct)

router.get("/product/:productId" , getProduct);

router.get("/product/photo/:productId" , photo);

//delete route
router.delete("/product/:productId/:userId" ,
                 isSignedIn , isAuthenticated , isAdmin, deleteProduct)

//update Product
router.put("/product/:productId/:userId" , isSignedIn, isAuthenticated , isAdmin , updateProduct)


//get all products
router.get("/products" ,getAllProducts);

router.get("/product/categories" , getAllUniqueCategories)
module.exports = router;