const User = require("../../Models/UserModels/userModel.js");
const ErrorHandler = require("../../utils/errorHandler.js");
const AsyncError = require("../../Middleware/catchAsyncError.js");
const sendToken = require("../../utils/jwtToken.js");
const { sendEmail } = require("../../utils/sendEmail.js");
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// Register a user
exports.registerUser = AsyncError(async(req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
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
            url: myCloud.secure_url
        },
        // Change the role by backend later on for start let it be admin after make it user
        // role: "admin"
    });

    sendToken(user, 200, res);
})

// Login user
exports.loginUser = AsyncError(async(req, res, next) => {

    // if(cookieParser.token.options)
    // {
    //     const userId = jwt.
    //     sendToken(user, )
    // }

    const { email, password } = req.body;

    if (!email || !password)
        return next(new ErrorHandler("Please Enter Email and Password", 400));

    const user = await User.findOne({ email }).select("+password");

    if (!user)
        return next(new ErrorHandler("Invalid Email or Password", 401));

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched)
        return next(new ErrorHandler("Invalid Email or Password", 401));

    sendToken(user, 200, res);
})

// Logout User
exports.logoutUser = AsyncError(async(req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(201).json({
        success: true,
        message: "Logout Successfully"
    });
})

// Forgot password
exports.forgotPassword = AsyncError(async(req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user)
        return next(new ErrorHandler("User not found", 404));

    // Get Reset Password Token
    const resetToken = user.getResetPasswordToken();

    // saving the user so that it doesnot get lost
    await user.save({ validateBeforeSave: false });

    // unique url for the forget password
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/users/password/reset/${resetToken}`;

    // message that would be sent as an email
    const message = `Your password reset token is : \n \n ${resetPasswordUrl} \n \n If uou have not requested this email then, please ignore it`;

    try {
        // sending mail to the user
        await sendEmail({
            email: user.email,
            subject: "Frameszon Password Recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email spent to ${user.email} successfully`
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
})

// Reset Password
exports.resetPassword = AsyncError(async(req, res, next) => {

    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user)
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired"), 400);

    if (req.body.password !== req.body.confirmPassword)
        return next(new ErrorHandler("Password does not match Confirm Password"), 400);

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    user.save();

    sendToken(user, 200, res);
})

// Get Users
exports.getUsers = AsyncError(async(req, res) => {

    const users = await User.find();

    res.status(201).json({
        success: true,
        users
    });
})

// Get User Details
exports.getUserDetails = AsyncError(async(req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(201).json({
        success: true,
        user
    });
})

// Update User password
exports.updatePassword = AsyncError(async(req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = AsyncError(async(req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Get all users(admin)
exports.getAllUser = AsyncError(async(req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get single user (admin)
exports.getSingleUser = AsyncError(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Role -- Admin
exports.updateUserRole = AsyncError(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Delete User --Admin
exports.deleteUser = AsyncError(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});