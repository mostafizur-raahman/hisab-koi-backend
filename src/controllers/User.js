const { OK } = require("http-status");

class UserController {
    async create(req, res, next) {
        try {
            console.log("UserController.create called");
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
}

module.exports = UserController;
