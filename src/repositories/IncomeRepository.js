const BaseRepository = require("./BaseRepository");

class IncomeRepository extends BaseRepository {
    constructor({ models }) {
        super(models.Income);

        this.payload = {
            userId: { type: "string", format: "objectId" },
            incomeAmount: { type: "number", minimum: 1 },
            reasons: { type: "array", items: { type: "string" } },
        };

        this.schema = {
            create: {
                type: "object",
                properties: this.payload,
                required: ["userId", "incomeAmount", "reasons"],
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

module.exports = IncomeRepository;
