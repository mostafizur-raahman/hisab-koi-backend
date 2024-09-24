const { OK } = require("http-status");
const Factory = require("./Factory");

class ExpenseController extends Factory {
    constructor() {
        super({ moduleName: "Expense" });
    }

    // read = () => async (req, res, next) => {
    //     const _read = this.createRead({}, "readIncome");

    //     await _read(req, res, next);
    // };

    async create(req, res, next) {
        try {
            const _doc = await req.container
                .resolve("createExpense")
                .execute({ data: req.body, userId: req.user._id });

            return res.status(OK).send({
                message: "Income created successfully",
                data: _doc,
            });
        } catch (error) {
            next(error);
        }
    }

    // async update(req, res, next) {
    //     try {
    //         // TODO: validate req.query
    //         const status = await req.container.resolve("updateIncome").execute({
    //             ids: [req.query.id],
    //             payload: req.body,
    //             userId: req.user._id,
    //         });

    //         if (status.modifiedCount === 0)
    //             return res
    //                 .status(NOT_FOUND)
    //                 .send({ message: "Income not found" });

    //         res.status(OK).send({
    //             message: "Income updated successfully.",
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // delete = () => async (req, res, next) => {
    //     const _delete = this.createDelete(req.query.id, "deleteIncome");

    //     return await _delete(req, res, next);
    // };
}

module.exports = ExpenseController;
