const { Router } = require("express");
const createController = require("../controllers/createController");
// const UserController = require("../controllers/User");
module.exports = () => {
    const router = new Router();
    const controller = createController("User");
    console.log("Router is calling");

    router.post("/create", controller.create);
    router.post("/verify-otp", controller.verifyOtp);

    return router;
};
