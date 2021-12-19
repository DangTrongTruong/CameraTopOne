const express = require('express');
const { newOrder, getSingleOrder, myOrder, getAllOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticateUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/order/new').post(isAuthenticateUser,newOrder)

router.route('/order/:id').post(isAuthenticateUser,authorizeRoles("admin"),getSingleOrder)

router.route('/orders/me').post(isAuthenticateUser,myOrder)

router.route('/admin/orders').post(isAuthenticateUser,authorizeRoles("admin"),getAllOrder)

router.route('/admin/order/:id')
.patch(isAuthenticateUser,authorizeRoles("admin"),updateOrder)
.delete(isAuthenticateUser,authorizeRoles("admin"),deleteOrder)

module.exports = router;