const express = require('express');
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetail,
    createProductReview,
    getAllProductReviews,
    deleteReview

} = require('../controllers/productController');
const { isAuthenticateUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();



router.route('/products').get(getAllProducts)

router.route('/product/new').post(isAuthenticateUser, authorizeRoles("admin"), createProduct)

router.route('/product/:id')
    .put(isAuthenticateUser, authorizeRoles("admin"), updateProduct)
    .post(isAuthenticateUser, authorizeRoles("admin"), deleteProduct)
    .get(getProductDetail)

router.route('/review').put(isAuthenticateUser, createProductReview)

router.route('/reviews')
.get(getAllProductReviews)
.delete(isAuthenticateUser, deleteReview)


module.exports = router;

