class CreateUser {
    constructor({
        userRepository,
        Fault,
        requestValidator,
        encryption,
        otpManager,
        nodeMailer,
    }) {
        this.userRepository = userRepository;
        this.Fault = Fault;
        this.requestValidator = requestValidator;
        this.encryption = encryption;
        this.otpManager = otpManager;
        this.nodeMailer = nodeMailer;
    }
    validateRequest(data) {
        this.requestValidator.validate(this.userRepository.schema.create, data);
    }

    async generateAndSaveOTP(email) {
        const otpCode = this.otpManager.generate();
        const otpExpiresAt = this.otpManager.generateOtpExpiry();

        await this.userRepository.updateOneByQuery(
            { email },
            {
                otp: {
                    email: {
                        code: otpCode,
                        expiresAt: otpExpiresAt,
                        email: email,
                    },
                },
            }
        );

        // Step 3: Send OTP to the user via email
        await this.nodeMailer.sendEmail({
            to: [email],
            subject: "Your OTP Code",
            body: `<p>Your OTP code is <b>${otpCode}</b>. It will expire in few minutes.</p>`,
        });
    }

    async execute(data) {
        this.validateRequest(data);

        const user = await this.userRepository.findOneByQuery({
            email: data.email,
            isDeleted: false,
        });

        if (user) {
            throw new this.Fault("User already exist, please sign in.");
        }

        if (data.password !== data.confirmPassword) {
            throw new this.Fault(
                "password and confirm password does not match",
                400
            );
        }
        if (data.password) {
            data.password = await this.encryption.encrypt(data.password);
        }

        delete data.confirmPassword;

        const newUser = await this.userRepository.create(data);

        this.generateAndSaveOTP(data.email);

        return this.userRepository.cleanResponse(newUser, [
            "password",
            "states",
            "__v",
            "createdAt",
            "updatedAt",
        ]);
    }
}

module.exports = CreateUser;
