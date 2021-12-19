
const Product = require('../models/productModel')
const Errorhander = require('../utils/errorhander');
const Order = require('../models/orderModel');
const sendEmail = require('../utils/sendEmail');
//Create new Order

exports.newOrder = async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user: req.user._id
    })

    res.status(201).json({
        success: true,
        order,
        message: 'Create new order successfully'
    })
}

//Get Order (ADMIN)

exports.getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        "name email"
    )
    if (!order) {
        return next(new Errorhander("Order khong ton tai", 404))
    }

    res.status(200).json({
        success: true,
        order,
    })
}

// Get My Order 

exports.myOrder = async (req, res, next) => {
    console.log(req.body)
    const orders = await Order.find({ user: req.user._id })
    if (!orders) {
        return next(new Errorhander("Order khong ton tai", 404))
    }

    res.status(200).json({
        success: true,
        orders,
    })
}

// Get All Order (ADMIN)

exports.getAllOrder = async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
}

//Update Order status (ADMIN)
exports.updateOrder = async (req, res, next) => {
    
    const order = await Order.findOneAndUpdate(req.params.id,{status:req.body.status})
    const message =`Order ${req.body.status}`

    if(req.body.status  === "resolve"){
         await  sendEmail({
            email:req.body.email,
            subject: `ORDER MESSAGE`,
            message,

        })
    }
    res.status(200).json({
        success: true,
        order,

    })

}



// Delete Order (ADMIN)

exports.deleteOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    await order.remove()

    if (!order) {
        return next(new Errorhander("Order khong ton tai", 404))
    }
    res.status(200).json({
        success: true,
        message: 'Delete Order successfully'
    })
}