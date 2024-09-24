const { Router } = require("express");
const createController = require("../controllers/createController");

module.exports = ({ authenticate }) => {
    const router = new Router();
    const controller = createController("Expense");

    router.post("/create", authenticate(), controller.create);

    // router.get("/", authenticate(), controller.read());

    // router.patch("/", authenticate(), controller.update);

    // // router.get("/read-profile", authenticate(), controller.readProfile);

    // router.delete("/", authenticate(), controller.delete());

    return router;
};
