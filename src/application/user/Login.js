class Login {
    constructor({ userRepository, Fault, encryption, jwt, config }) {
        this.userRepository = userRepository;
        this.Fault = Fault;
        this.encryption = encryption;
        this.jwt = jwt;
        this.config = config;
    }

    async execute({ email, password }) {
        try {
            const user = await this.findUserByEmail(email);

            await this.verifyPassword(password, user.password);

            const token = this.generateToken(user);

            return this.buildResponse(token, user);
        } catch (error) {
            throw error;
        }
    }

    async findUserByEmail(email) {
        const user = await this.userRepository.findOneByQuery({
            email,
            isVerified: true,
            isDeleted: false,
        });

        if (!user) {
            throw new this.Fault("User not found", 404);
        }

        return user;
    }

    async verifyPassword(inputPassword, storedPassword) {
        const isValid = await this.encryption.compare(
            inputPassword,
            storedPassword
        );

        if (!isValid) {
            throw new this.Fault("Invalid password", 400);
        }
    }

    // Helper function to generate JWT token
    generateToken(user) {
        return this.jwt.sign(
            { id: user._id, email: user.email },
            this.config.jwt_secret,
            this.config.jwt_ttl || 3600
        );
    }

    // Helper function to build the response object
    buildResponse(token, user) {
        return {
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        };
    }
}

module.exports = Login;
