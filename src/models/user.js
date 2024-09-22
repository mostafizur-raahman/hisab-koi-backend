const { mongo, default: mongoose } = require("mongoose");
const { generateModel } = require("./baseModel");

module.exports = generateModel({
    modelName: "User",
    schema: {
        name: String,
        email: String,
        loginType: {
            type: String,
            enum: ["google", "email"],
        },
        password: String,
        confirmPassword: String,
        role: {
            type: String,
            default: "User",
        },
        profession: String,
        gender: {
            type: String,
            enum: ["Male", "Female"],
        },
        fcmToken: String,
        image: String,
        incomeReasons: [String],
        expenseReasons: [String],
        recentDeeds: [String],
        otp: {
            email: {
                code: Number,
                expiresAt: Number,
                email: String,
            },
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
});
