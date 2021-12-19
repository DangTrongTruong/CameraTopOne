const Errorhander = require('../utils/errorhander');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary')

//Register a User
exports.registerUser = async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatar2",
        width: 150,
        crop: "scale",
      });
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
    })
    
    sendToken(user, 201, res)
}

//Login user
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    //Kiem tra da co email va password  
    if (!email || !password) {
        return next(new Errorhander("Vui lòng nhập Email và Password", 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new Errorhander("Email hoặc password không hợp lệ", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);
    console.log(isPasswordMatched)
    if (!isPasswordMatched) {
        return next(new Errorhander("Password không hợp lệ", 401))
    }

    // const token = user.getJWTToken();
    // res.status(200).json({
    //     success:true,
    //     token,
    //     message:"Dang nhap thanh cong"
    // })
    
    sendToken(user, 200, res)
}

//Logout User
exports.logout = async (req, res, next) => {
   

    res.status(200).json({
        success: true,
        message: "Đăng xuất thành công"
    })
}

// Forgot password

exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new Errorhander("Tài khoản không tồn tại", 401));
    }
    //Get resetPasswordToken
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${process.env.FRONEND_URL}/password/reset/${resetToken}`;
    const message = `Link lấy password: ${resetPasswordUrl} `
    try {

        await sendEmail({
            email: user.email,
            subject: `ADMIN SEND LINK FORGOT PASSWORD`,
            message,

        }

        )

        res.status(200).json({
            success: true,
            message: `Gửi mã xác thực tới Email:${user.email} thành công`
        })


    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExprire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new Errorhander(error.message, 500));
    }
}

//Reset password 

exports.resetPassword = async (req, res, next) => {
    //token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExprire: { $gt: Date.now() },
    })
    if (!user) {
        return next(new Errorhander("ResetToken không hợp lệ hoặc đã hết hạn", 404));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new Errorhander("Password nhập lại không trùng khớp, vui lòng nhập lại", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExprire = undefined;

    await user.save();

    sendToken(user, 200, res)

}

//Get user detail
exports.getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    })
}

//Get All user (Admin)
exports.getAllUser = async (req, res, next) => {
    const user = await User.find();

    res.status(200).json({
        success: true,
        user,
    })
}

//Get single user (Admin)
exports.getSingleUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new Errorhander("User khong ton tai"))
    }
    res.status(200).json({
        success: true,
        user,
    })
}


// update User password
exports.updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHander("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHander("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
  };
  

//update profile User

exports.updateProfile = async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
}

//update profile User Role (ADMIN)

exports.updateUserRole = async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
}

//deleteUser (ADMIN)

exports.deleteUser = async (req, res, next) => {
console.log(req.params.id)

    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new Errorhander("User khong ton tai"))
    }
    await user.remove()
    res.status(200).json({
        success: true,
        user
    })
}