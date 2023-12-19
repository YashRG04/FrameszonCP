const Product = require("../../Models/ProductModels/ProductModel.js");
const ErrorHandler = require("../../utils/errorHandler.js");
const AsyncError = require("../../Middleware/catchAsyncError.js");
const ApiFeatures = require("../../utils/apiFeatures/apiFeatures.js");
const cloudinary = require("cloudinary");

// Create --Admin only feature
exports.createProduct = AsyncError(async(req, res, next) => {

    // Adding images making its url and id
    let images = [];

    if (typeof(req.body.images) === "string") {
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

    // adding user which added the product
    req.body.createdBy = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

// Upadte Product --Admin
exports.updateProduct = AsyncError(async(req, res, next) => {

    let product = await Product.findById(req.params.id);

    // console.log(typeof(req.body.images));

    if (!product)
        return next(new ErrorHandler("Product not found", 404));

    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
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
        useFindAndModify: false
    })


    res.status(201).json({
        success: true,
        product
    })
})

// Delete Product --Admin
exports.deleteProduct = AsyncError(async(req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product)
        return next(new ErrorHandler("Product not found", 404));

    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(201).json({
        success: true,
        message: "Product Deleted"
    })
})

// Get All
exports.getAllProducts = AsyncError(async(req, res) => {

    // Number of products per page
    const productsPerPage = 10;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query).Search().Filter().Pagination(productsPerPage);
    const products = await apiFeature.query;
    const filterProductsCount = products.length;

    res.status(200).json({
        success: true,
        products,
        productCount,
        productsPerPage,
        filterProductsCount
    })
})

// Get All Product (Admin)
exports.getAdminProducts = AsyncError(async(req, res, next) => {
    const productsPerPage = 30;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query).Search().Filter().Pagination(productsPerPage);
    const products = await apiFeature.query;
    const filterProductsCount = products.length;

    res.status(200).json({
        success: true,
        products,
        productCount,
        productsPerPage,
        filterProductsCount
    })
});

// Get single Product
exports.getProductDetails = AsyncError(async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product)
        return next(new ErrorHandler("Product not found", 404));

    res.status(201).json({
        success: true,
        message: "Product Found",
        product
    })
})

// Create New Review or Update the review
// exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
//     const { rating, comment, productId } = req.body;

//     const review = {
//         user: req.user._id,
//         name: req.user.name,
//         rating: Number(rating),
//         comment,
//     };

//     const product = await Product.findById(productId);

//     const isReviewed = product.reviews.find(
//         (rev) => rev.user.toString() === req.user._id.toString()
//     );

//     if (isReviewed) {
//         product.reviews.forEach((rev) => {
//             if (rev.user.toString() === req.user._id.toString())
//                 (rev.rating = rating), (rev.comment = comment);
//         });
//     } else {
//         product.reviews.push(review);
//         product.numOfReviews = product.reviews.length;
//     }

//     let avg = 0;

//     product.reviews.forEach((rev) => {
//         avg += rev.rating;
//     });

//     product.ratings = avg / product.reviews.length;

//     await product.save({ validateBeforeSave: false });

//     res.status(200).json({
//         success: true,
//     });
// });

// // Get All Reviews of a product
// exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
//     const product = await Product.findById(req.query.id);

//     if (!product) {
//         return next(new ErrorHander("Product not found", 404));
//     }

//     res.status(200).json({
//         success: true,
//         reviews: product.reviews,
//     });
// });

// // Delete Review
// exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
//     const product = await Product.findById(req.query.productId);

//     if (!product) {
//         return next(new ErrorHander("Product not found", 404));
//     }

//     const reviews = product.reviews.filter(
//         (rev) => rev._id.toString() !== req.query.id.toString()
//     );

//     let avg = 0;

//     reviews.forEach((rev) => {
//         avg += rev.rating;
//     });

//     let ratings = 0;

//     if (reviews.length === 0) {
//         ratings = 0;
//     } else {
//         ratings = avg / reviews.length;
//     }

//     const numOfReviews = reviews.length;

//     await Product.findByIdAndUpdate(
//         req.query.productId,
//         {
//             reviews,
//             ratings,
//             numOfReviews,
//         },
//         {
//             new: true,
//             runValidators: true,
//             useFindAndModify: false,
//         }
//     );

//     res.status(200).json({
//         success: true,
//     });
// });