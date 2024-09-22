class ReadUser {
    constructor({ readFactory, userRepository }) {
        this.readFactory = readFactory;
        this.userRepository = userRepository;
    }

    async execute(props) {
        try {
            const reader = this.readFactory.createReader({
                repository: this.userRepository,
            });

            return await reader.execute(props, [
                {
                    $project: {
                        ...this.userRepository.projection.negative,
                    },
                },
            ]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ReadUser;
