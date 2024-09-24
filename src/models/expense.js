const { mongo, default: mongoose } = require("mongoose");
const { generateModel } = require("./baseModel");

module.exports = generateModel({
    modelName: "Expense",
    schema: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        expenseAmount: Number,
        reason: String,
        date: {
            type: Date,
            default: Date.now(),
        },
    },
});
