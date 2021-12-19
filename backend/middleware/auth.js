const Errorhander = require("../utils/errorhander")
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
exports.isAuthenticateUser = async (req, res, next) => {
    const { token } = req.body
    if (!token) {
        return next(new Errorhander("Vui lòng đăng nhập tài khoản", 401))
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    //decodedData = { id: '', iat: , exp:  }
    req.user = await User.findById(decodedData.id)
    next()
}
exports.authorizeRoles = (...roles) => {
       
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new Errorhander(
                    `Tài khoản quyền :${req.user.role} không được phép truy cập page quản lý Admin`, 403
                )
            )
        }
        next()
    }
}