const BaseRepository = require("./BaseRepository");

class ExpenseRepository extends BaseRepository {
    constructor({ models }) {
        super(models.Expense);

        this.payload = {
            userId: { type: "string", format: "objectId" },
            expenseAmount: { type: "number", minimum: 1 },
            reason: { type: "string" },
        };

        this.schema = {
            create: {
                type: "object",
                properties: this.payload,
                required: ["userId", "expenseAmount", "reason"],
                additionalProperties: false,
            },
            update: {
                type: "object",
                properties: this.payload,
                additionalProperties: false,
            },
        };

        this.projection = {
            negative: {
                __v: 0,
                isDeleted: 0,
                states: 0,
                createdBy: 0,
                otp: 0,
            },
        };
    }

    constructSearchQuery(query) {
        const searchFields = [{ name: { $regex: query, $options: "i" } }];

        return searchFields;
    }
}

module.exports = ExpenseRepository;
