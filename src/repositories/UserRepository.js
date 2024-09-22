const BaseRepository = require("./BaseRepository");

class UserRepository extends BaseRepository {
    constructor({ models }) {
        super(models.User);

        this.payload = {
            name: { type: "string" },
            email: { type: "string" },
            loginType: {
                type: "string",
                enum: ["google", "email"],
            },
            password: { type: "string" },
            confirmPassword: { type: "string" },
            role: { type: "string" },
            profession: { type: "string" },
            gender: {
                type: "string",
                enum: ["Male", "Female"],
            },
            fcmToken: { type: "string" },
            image: { type: "string" },
            incomeReasons: { type: "array", items: { type: "string" } },
            expenseReasons: { type: "array", items: { type: "string" } },
            recentDeeds: { type: "array", items: { type: "string" } },
        };

        this.verifyOtp = {
            email: { type: "string" },
            otp: { type: "number" },
        };

        this.schema = {
            create: {
                type: "object",
                properties: this.payload,
                required: [
                    "name",
                    "email",
                    "loginType",
                    "password",
                    "confirmPassword",
                    "profession",
                    "gender",
                    "image",
                    "incomeReasons",
                    "expenseReasons",
                    "recentDeeds",
                ],
                additionalProperties: false,
            },
            checkOtp: {
                type: "object",
                properties: this.verifyOtp,
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

module.exports = UserRepository;
