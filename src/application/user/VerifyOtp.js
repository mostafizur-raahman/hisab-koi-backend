class VerifyOtp {
    constructor({ userRepository, Fault, requestValidator }) {
        this.userRepository = userRepository;
        this.Fault = Fault;
        this.requestValidator = requestValidator;
    }

    validateRequest(data) {
        this.requestValidator.validate(
            this.userRepository.schema.checkOtp,
            data
        );
    }

    async execute({ email, otp }) {
        try {
            this.validateRequest({ email, otp });

            const user = await this.userRepository.findOneByQuery({
                email: email,
                isDeleted: false,
            });

            if (!user) {
                throw new this.Fault("User not found", 404);
            }

            const userOtp = user.otp?.email;

            const currentTime = Date.now();
            if (currentTime > userOtp.expiresAt) {
                throw new this.Fault("OTP has expired", 400);
            }

            if (otp !== userOtp.code) {
                throw new this.Fault(
                    "OTP does not match, please try again",
                    400
                );
            }

            await this.userRepository.updateOneByQuery(
                { email: email },
                {
                    $set: { isVerified: true },
                }
            );
        } catch (error) {
            throw error;
        }
    }
}

module.exports = VerifyOtp;
