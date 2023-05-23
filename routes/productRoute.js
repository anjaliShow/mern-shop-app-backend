const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProductd,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get( getAllProduct);

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProductd);


router.route("/admin/products/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
  
  router.route("/products/:id").get(getProductDetails);

  router.route("/review").put(isAuthenticatedUser, createProductReview);

  router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);
 

module.exports = router;
