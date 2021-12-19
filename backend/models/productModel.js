const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Enter product Name"],
  },
  description: {
    type: String,
    require: [true, "Please Enter product description"],
  },
  price: {
    type: Number,
    require: [true, "Please Enter product price"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },
  ],
  category: {
    type: String,
    require: [true, "Please Enter product category"],
  },
  Stock: {
    type: Number,
    require: [true, "Please Enter product stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true,
      },
      name: {
        type: String,
        require: true,
      },
      rating: {
        type: Number,
        require: true,
      },
      comment: {
        type: String,
        require: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *      id: 
 *        type: string
 *        description: The auto-generated id of the product
 *      name: 
 *        type: string
 *        description: the name of product
 *      description:
 *        type: string
 *        description: the description
 *      price:
 *        type: number
 *        description: the price
 *      ratings: 
 *          type: number
 *          description: the ratings
 *      images:
 *          type: array
 *          description: the images
 *      category:
 *          type: string
 *          description: the category
 *      Stock:
 *          type: number
 *          description: the Stock
 *      numOfReviews:
 *          type: number
 *          description: the numOfReviews
 *       reviews:
 *          type: array
 *          description: the reviews
 *      user:
 *          type:string
 *           description: the user_id
 *    example: 
 *      id: _fdakfakhfa
 *      name: Product A
 *      description: Mo ta san pham
 *      price: 200
 *      ratings: 2
 *      images:
 *      category:iphone
 *      Stock:23
 *      numOfReviews:2
 *      reviews:2
 *      user:_djashdkjahs
 *      
 */
module.exports = mongoose.model("Product", productSchema);
