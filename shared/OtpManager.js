class OtpManager {
    constructor() {
        this.DEFAULT_EXPIRY_TIME = 60 * 3000;
    }

    generate(minDigits = 6, maxDigits = 6) {
        const min = Math.pow(10, minDigits - 1);
        const max = Math.pow(10, maxDigits) - 1;
        const otp = Math.floor(Math.random() * (max - min + 1)) + min;
        return otp;
    }

    isValidOtp = (expiry) => {
        return new Date().getTime() < expiry;
    };

    generateOtpExpiry = (expiryTime = this.DEFAULT_EXPIRY_TIME) => {
        return new Date().getTime() + expiryTime;
    };
}

module.exports = OtpManager;
