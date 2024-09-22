const { mongo, default: mongoose } = require("mongoose");
const { generateModel } = require("./baseModel");

module.exports = generateModel({
    modelName: "Income",
    schema: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        incomeAmount: Number,
        reasons: [String],
        date: {
            type: Date,
            default: Date.now(),
        },
    },
});
