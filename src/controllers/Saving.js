const { OK } = require("http-status");
const Factory = require("./Factory");

class ExpenseController extends Factory {
    constructor() {
        super({ moduleName: "Savings" });
    }

    async read(req, res, next) {
        try {
            const _doc = await req.container
                .resolve("readSaving")
                .execute({ userId: req.user._id });

            return res.status(OK).send({
                message: "Savings created successfully",
                data: _doc,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ExpenseController;
