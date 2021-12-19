const Product = require('../models/productModel');
const Errorhander = require('../utils/errorhander');
const ApiFeatures = require('../utils/apifeatures');
const cloudinary = require("cloudinary");
/**
 * @swagger
 * /api/v1/products
 *  get:
 *  sumary:Tra ve danh sach tat ca san pham
 *  responses:
 *   200:
 *    description: danh sach san pham
 *    content:
 *      application/json:
 *      schema:
 *        type: array
 *        items:
 *          $ref:'#/components/schemas/Product
 */

//getAllProducts
exports.getAllProducts = async (req, res) => {
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
    const products = await apiFeature.query;
    res.status(200).json(
        {
            products,
            success: true,
            productCount,
        }
    )
}

//Create Product -- Admin
exports.createProduct = async (req, res, next) => {
    let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
    message: 'Product created successfully'
  });
}

//Update Product -- Admin

exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
      
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
    message: "Product updated successfully"
  });
}

//Delete Product -- Admin
exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new Errorhander("Product not found", 404));
    }
    product.remove()
    res.status(200).json({
        success: true,
        message: "Product Delete Successfuly",
        product
    })
}
//Get Product Detail -- Admin

exports.getProductDetail = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new Errorhander("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        product
    })
}

//Đánh giá sản phẩm ( xếp hạng, bình luận) tạo mới và update

exports.createProductReview = async (req, res, next) => {
    console.log(req.body)
    const { rating, comment, productId } = req.body;
        
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);
    

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())
    //Kiểm tra 1 user đánh giá thì đánh giá mới nhất sễ được gán cho đánh giá đằng trước
    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                (rev.rating = rating),
                    (rev.comment = comment)
            }
        });
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    //Tính trung bình Rating của sản phẩm được đánh giá
    let initRatingNumber = 0;
    product.reviews.forEach(rev => {
        initRatingNumber += rev.rating
    })

    product.ratings = initRatingNumber
        / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: `Đánh giá sản phẩm ${product.name} thành công`
    })
}

//Get All Reviews Product
exports.getAllProductReviews = async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    console.log(product)
    if (!product) {
        return next(new Errorhander("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
}

//Delete Review

exports.deleteReview = async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new Errorhander("Product not found", 404));
    }

    const reviews = product.reviews.filter(rev => {
        return rev._id.toString() !== req.query.id.toString()
    })

    //Tính trung bình Rating của sản phẩm được đánh giá
    let initRatingNumber = 0;
    reviews.forEach(rev => {
        initRatingNumber += rev.rating
    })

    const ratings = initRatingNumber / reviews.length

    const numOfReviews = ratings.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    )

    res.status(200).json({
        success: true,
        message: "Xoa danh gia thanh cong"
    })
}


/**
 * @swagger
 * tags:
 *  name: Products
 *  description: API danh cho Products
 */