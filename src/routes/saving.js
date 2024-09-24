const { Router } = require("express");
const createController = require("../controllers/createController");

module.exports = ({ authenticate }) => {
    const router = new Router();
    const controller = createController("Saving");

    router.get("/", authenticate(), controller.read);

    return router;
};
