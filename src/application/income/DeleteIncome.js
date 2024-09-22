class DeleteIncome {
    constructor({ deleteFactory, incomeRepository }) {
        this.deleteFactory = deleteFactory;
        this.incomeRepository = incomeRepository;
    }

    async execute(props) {
        const _delete = this.deleteFactory.createDelete({
            repository: this.incomeRepository,
        });

        return await _delete.execute({
            ids: props.ids,
            userId: props.userId,
        });
    }
}

module.exports = DeleteIncome;
