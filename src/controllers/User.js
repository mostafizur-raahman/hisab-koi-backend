const { OK } = require("http-status");
const Factory = require("./Factory");

class UserController extends Factory {
    constructor() {
        super({ moduleName: "User" });
    }

    read = () => async (req, res, next) => {
        const _read = this.createRead({}, "readUser");

        await _read(req, res, next);
    };

    async create(req, res, next) {
        try {
            const _doc = await req.container
                .resolve("createUser")
                .execute(req.body);

            return res.status(OK).send({
                message: "User created successfully",
                data: _doc,
            });
        } catch (error) {
            next(error);
        }
    }

    async verifyOtp(req, res, next) {
        try {
            await req.container.resolve("verifyOtp").execute(req.body);

            return res.status(OK).send({
                message: "OTP verified successfully",
            });
        } catch (error) {
            next(error);
        }
    }

    async emailLogin(req, res, next) {
        try {
            const _doc = await req.container.resolve("login").execute(req.body);

            return res.status(OK).send({
                message: "Login successfully",
                data: _doc,
            });
        } catch (error) {
            next(error);
        }
    }

    async readProfile(req, res, next) {
        try {
            const _doc = await req.container.resolve("readProfile").execute({
                user: req.user,
            });

            return res.status(OK).send({
                message: "User fetch successfully",
                data: _doc,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
