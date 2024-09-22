class CreateIncome {
    constructor({ incomeRepository, Fault, requestValidator }) {
        this.incomeRepository = incomeRepository;
        this.Fault = Fault;
        this.requestValidator = requestValidator;
    }
    validateRequest(data) {
        this.requestValidator.validate(
            this.incomeRepository.schema.create,
            data
        );
    }
    async execute({ data, userId }) {
        try {
            this.validateRequest(data);

            const _doc = await this.incomeRepository.create(data);
            return this.incomeRepository.cleanResponse(data, ["states", "__v"]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CreateIncome;
