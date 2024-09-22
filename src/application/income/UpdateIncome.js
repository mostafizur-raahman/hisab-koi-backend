class UpdateIncome {
    constructor({ incomeRepository, Fault, requestValidator }) {
        this.incomeRepository = incomeRepository;
        this.Fault = Fault;
        this.requestValidator = requestValidator;
    }
    async execute({ ids, payload, userId }) {
        try {
            this.requestValidator.validate(
                this.incomeRepository.schema.update,
                payload
            );

            const _doc = await this.incomeRepository.updateManyByQuery(
                { _id: { $in: ids }, isDeleted: false },
                {
                    ...payload,
                    $push: {
                        states: {
                            user: userId,
                            payload: payload,
                        },
                    },
                }
            );

            if (!_doc) {
                throw new this.Fault("Brand does not exist", 404);
            }

            return _doc;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UpdateIncome;
