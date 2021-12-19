const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please Enter Your Name"],
        maxLength: [50, "Name cannot excees 30 characters"],
        minLength: [5, "Name should have more than 5 characters"]
    },
    email: {
        type: String,
        require: [true, "Please Enter Your Email"],
        unique: true,
        validator: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        require: [true, "Please Enter Your Password"],
        minLength: [6, "Password should have more than 6 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            require: true
        },
        url: {
            type: String,
            require: true
        },
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },

    resetPasswordToken: String,
    resetPasswordExprire: Date,
});

//ma hoa truoc khi luu vao mongoose
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Đối chiếu password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword.toString(), this.password)
}
//JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}


// Tạo token lấy lại mật khẩu 
userSchema.methods.getResetPasswordToken = function () {
    // Tao resetToken 
    const resetToken = crypto.randomBytes(20).toString("hex")
    // Them resetPasswordToken vao userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExprire = Date.now() + 15 * 60 * 1000;

    return resetToken

}
module.exports = mongoose.model("User", userSchema);