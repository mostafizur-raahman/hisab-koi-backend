class CreateExpense {
    constructor({ expenseRepository, Fault, requestValidator }) {
        this.expenseRepository = expenseRepository;
        this.Fault = Fault;
        this.requestValidator = requestValidator;
    }
    validateRequest(data) {
        this.requestValidator.validate(
            this.expenseRepository.schema.create,
            data
        );
    }
    async execute({ data, userId }) {
        try {
            this.validateRequest(data);

            await this.expenseRepository.create(data);

            return this.expenseRepository.cleanResponse(data, [
                "states",
                "__v",
            ]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CreateExpense;
