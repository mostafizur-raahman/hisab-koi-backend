class ReadProfile {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async execute({ user }) {
        try {
            return this.userRepository.cleanResponse(user, [
                "states",
                "otp",
                "password",
                "fcmToken",
                "isDeleted",
                "__v",
            ]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ReadProfile;
