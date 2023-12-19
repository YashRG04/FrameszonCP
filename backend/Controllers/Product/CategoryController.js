const ErrorHandler = require("../../utils/errorHandler.js");
const AsyncError = require("../../Middleware/catchAsyncError.js");
const cloudinary = require("cloudinary");

const Shape = require("../../Models/ProductModels/ShapeModels.js")
const Gender = require("../../Models/ProductModels/GenderModel.js")
const Brand = require("../../Models/ProductModels/BrandModel.js");
const Special = require("../../Models/ProductModels/SpecialModel.js");
const Category = require("../../Models/ProductModels/CategoryModel.js");

// CATEGORY

// Create category --Admin only feature
exports.createCategory = AsyncError(async(req, res, next) => {

    // Adding images making its url and id
    // let images = [];

    // if (typeof req.body.images === "string") {
    //     images.push(req.body.images);
    // } else {
    //     images = req.body.images;
    // }

    // const imagesLinks = [];

    // for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //         folder: "products",
    //     });

    //     imagesLinks.push({
    //         public_id: result.public_id,
    //         url: result.secure_url,
    //     });
    // }

    // req.body.images = imagesLinks;
    // req.body.user = req.user.id;

    // adding user which added the product

    req.body.createdBy = req.user.id;
    const category = await Category.create(req.body);

    res.status(201).json({
        success: true,
        category
    })
});

// Upadte category --Admin
exports.updateCategory = AsyncError(async(req, res, next) => {

    let category = await Category.findById(req.params.id);

    if (!category)
        return next(new ErrorHandler("Category not found", 404));

    // Images Start Here
    // let images = [];

    // if (typeof req.body.images === "string") {
    //     images.push(req.body.images);
    // } else {
    //     images = req.body.images;
    // }

    // if (images !== undefined) {
    //     // Deleting Images From Cloudinary
    //     for (let i = 0; i < product.images.length; i++) {
    //         await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    //     }

    //     const imagesLinks = [];

    //     for (let i = 0; i < images.length; i++) {
    //         const result = await cloudinary.v2.uploader.upload(images[i], {
    //             folder: "products",
    //         });

    //         imagesLinks.push({
    //             public_id: result.public_id,
    //             url: result.secure_url,
    //         });
    //     }

    //     req.body.images = imagesLinks;
    // }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })


    res.status(201).json({
        success: true,
        category
    })
})

// Delete category --Admin
exports.deleteCategory = AsyncError(async(req, res, next) => {

    let category = await Category.findById(req.params.id);

    if (!category)
        return next(new ErrorHandler("Category not found", 404));

    // Deleting Images From Cloudinary
    // for (let i = 0; i < product.images.length; i++) {
    //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    // }

    await Category.findByIdAndDelete(req.params.id);

    res.status(201).json({
        success: true,
        message: "Product Deleted"
    })
})

// GENDER

// Create gender --Admin only feature
exports.createGender = AsyncError(async(req, res, next) => {

    // Adding images making its url and id
    // let images = [];

    // if (typeof req.body.images === "string") {
    //     images.push(req.body.images);
    // } else {
    //     images = req.body.images;
    // }

    // const imagesLinks = [];

    // for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //         folder: "products",
    //     });

    //     imagesLinks.push({
    //         public_id: result.public_id,
    //         url: result.secure_url,
    //     });
    // }

    // req.body.images = imagesLinks;
    // req.body.user = req.user.id;

    // adding user which added the product

    req.body.createdBy = req.user.id;
    const gender = await Gender.create(req.body);

    res.status(201).json({
        success: true,
        gender
    })
});

// Upadte gender --Admin
exports.updateGender = AsyncError(async(req, res, next) => {

    let gender = await Gender.findById(req.params.id);

    if (!gender)
        return next(new ErrorHandler("Gender not found", 404));

    // Images Start Here
    // let images = [];

    // if (typeof req.body.images === "string") {
    //     images.push(req.body.images);
    // } else {
    //     images = req.body.images;
    // }

    // if (images !== undefined) {
    //     // Deleting Images From Cloudinary
    //     for (let i = 0; i < product.images.length; i++) {
    //         await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    //     }

    //     const imagesLinks = [];

    //     for (let i = 0; i < images.length; i++) {
    //         const result = await cloudinary.v2.uploader.upload(images[i], {
    //             folder: "products",
    //         });

    //         imagesLinks.push({
    //             public_id: result.public_id,
    //             url: result.secure_url,
    //         });
    //     }

    //     req.body.images = imagesLinks;
    // }

    gender = await Gender.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })


    res.status(201).json({
        success: true,
        gender
    })
})

// Delete gender --Admin
exports.deleteGender = AsyncError(async(req, res, next) => {

    let gender = await Gender.findById(req.params.id);

    if (!gender)
        return next(new ErrorHandler("Gender not found", 404));

    // Deleting Images From Cloudinary
    // for (let i = 0; i < product.images.length; i++) {
    //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    // }

    await Gender.findByIdAndDelete(req.params.id);

    res.status(201).json({
        success: true,
        message: "Product Deleted"
    })
})


// SPECIAL

// Create special --Admin only feature
exports.createSpecial = AsyncError(async(req, res, next) => {

    // Adding images making its url and id
    // let images = [];

    // if (typeof req.body.images === "string") {
    //     images.push(req.body.images);
    // } else {
    //     images = req.body.images;
    // }

    // const imagesLinks = [];

    // for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //         folder: "products",
    //     });

    //     imagesLinks.push({
    //         public_id: result.public_id,
    //         url: result.secure_url,
    //     });
    // }

    // req.body.images = imagesLinks;
    // req.body.user = req.user.id;

    // adding user which added the product

    req.body.createdBy = req.user.id;
    const special = await Special.create(req.body);

    res.status(201).json({
        success: true,
        special
    })
});

// Update special --Admin
exports.updateSpecial = AsyncError(async(req, res, next) => {

    let special = await Special.findById(req.params.id);

    if (!special)
        return next(new ErrorHandler("Special not found", 404));

    // Images Start Here
    // let images = [];

    // if (typeof req.body.images === "string") {
    //     images.push(req.body.images);
    // } else {
    //     images = req.body.images;
    // }

    // if (images !== undefined) {
    //     // Deleting Images From Cloudinary
    //     for (let i = 0; i < product.images.length; i++) {
    //         await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    //     }

    //     const imagesLinks = [];

    //     for (let i = 0; i < images.length; i++) {
    //         const result = await cloudinary.v2.uploader.upload(images[i], {
    //             folder: "products",
    //         });

    //         imagesLinks.push({
    //             public_id: result.public_id,
    //             url: result.secure_url,
    //         });
    //     }

    //     req.body.images = imagesLinks;
    // }

    special = await Special.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })


    res.status(201).json({
        success: true,
        gender
    })
})

// Delete special --Admin
exports.deleteSpecial = AsyncError(async(req, res, next) => {

    let special = await Special.findById(req.params.id);

    if (!special)
        return next(new ErrorHandler("Special not found", 404));

    // Deleting Images From Cloudinary
    // for (let i = 0; i < product.images.length; i++) {
    //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    // }

    await Special.findByIdAndDelete(req.params.id);

    res.status(201).json({
        success: true,
        message: "Product Deleted"
    })
})

// BRAND

// Create brand --Admin only feature
exports.createBrand = AsyncError(async(req, res, next) => {

    // Adding images making its url and id
    // let images = [];

    // if (typeof req.body.images === "string") {
    //     images.push(req.body.images);
    // } else {
    //     images = req.body.images;
    // }

    // const imagesLinks = [];

    // for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //         folder: "products",
    //     });

    //     imagesLinks.push({
    //         public_id: result.public_id,
    //         url: result.secure_url,
    //     });
    // }

    // req.body.images = imagesLinks;
    // req.body.user = req.user.id;

    // adding user which added the product

    req.body.createdBy = req.user.id;
    const brand = await Brand.create(req.body);

    res.status(201).json({
        success: true,
        brand
    })
});

// Upadte brand --Admin
exports.updateBrand = AsyncError(async(req, res, next) => {

    let brand = await Brand.findById(req.params.id);

    if (!brand)
        return next(new ErrorHandler("Gender not found", 404));

    // Images Start Here
    // let images = [];

    // if (typeof req.body.images === "string") {
    //     images.push(req.body.images);
    // } else {
    //     images = req.body.images;
    // }

    // if (images !== undefined) {
    //     // Deleting Images From Cloudinary
    //     for (let i = 0; i < product.images.length; i++) {
    //         await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    //     }

    //     const imagesLinks = [];

    //     for (let i = 0; i < images.length; i++) {
    //         const result = await cloudinary.v2.uploader.upload(images[i], {
    //             folder: "products",
    //         });

    //         imagesLinks.push({
    //             public_id: result.public_id,
    //             url: result.secure_url,
    //         });
    //     }

    //     req.body.images = imagesLinks;
    // }

    brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })


    res.status(201).json({
        success: true,
        brand
    })
})

// Delete brand --Admin
exports.deleteBrand = AsyncError(async(req, res, next) => {

    let brand = await Brand.findById(req.params.id);

    if (!brand)
        return next(new ErrorHandler("Gender not found", 404));

    // Deleting Images From Cloudinary
    // for (let i = 0; i < product.images.length; i++) {
    //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    // }

    await Brand.findByIdAndDelete(req.params.id);

    res.status(201).json({
        success: true,
        message: "Product Deleted"
    })
})


// SHAPE

// Create shape --Admin only feature
exports.createShape = AsyncError(async(req, res, next) => {

    // Adding images making its url and id
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
    // req.body.user = req.user.id;

    // adding user which added the product

    req.body.createdBy = req.user.id;
    const shape = await Shape.create(req.body);

    res.status(201).json({
        success: true,
        shape
    })
});

// Update shape --Admin
exports.updateShape = AsyncError(async(req, res, next) => {

    let shape = await Shape.findById(req.params.id);

    if (!shape)
        return next(new ErrorHandler("Special not found", 404));

    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < shape.images.length; i++) {
            await cloudinary.v2.uploader.destroy(shape.images[i].public_id);
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

    shape = await Shape.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(201).json({
        success: true,
        shape
    })
})

// Delete shape --Admin
exports.deleteShape = AsyncError(async(req, res, next) => {

    let shape = await Shape.findById(req.params.id);

    if (!shape)
        return next(new ErrorHandler("Special not found", 404));

    // Deleting Images From Cloudinary
    for (let i = 0; i < shape.images.length; i++) {
        await cloudinary.v2.uploader.destroy(shape.images[i].public_id);
    }

    await Shape.findByIdAndDelete(req.params.id);

    res.status(201).json({
        success: true,
        message: "Product Deleted"
    })
})


// Get Categories, Brand, Shapes, Special, Gender

exports.getAllCategories = AsyncError(async(req, res, next) => {
    const categories = await Category.find();
    const genders = await Gender.find();
    const specials = await Special.find();
    const brands = await Brand.find();
    const shapes = await Shape.find();

    res.status(200).json({
        success: true,
        categories,
        genders,
        specials,
        brands,
        shapes
    });
});

// exports.getCategoryById = AsyncError(async(req, res, next) => {

//     let tmp = await Shape.findById(req.params.id);
//     tmp = await Category.findById(req.params.id);
//     console.log(tmp);

//     res.status(200).json({
//         success: true,
//         message: "This works",
//         tmp
//     })
// })