const { Router } = require("express");
const createController = require("../controllers/createController");
// const UserController = require("../controllers/User");

module.exports = ({ authenticate }) => {
    const router = new Router();
    const controller = createController("User");

    router.post("/create", controller.create);
    router.post("/verify-otp", controller.verifyOtp);
    router.post("/email-login", controller.emailLogin);

    router.get("/", controller.read());

    router.get("/read-profile", authenticate(), controller.readProfile);

    return router;
};
