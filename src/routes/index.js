const { Router } = require("express");
const authenticate = require("../../shared/auth");
const userRoutes = require("./user");
const incomeRoutes = require("./income");
const expenseRoutes = require("./expense");
const savingRoutes = require("./saving");

const routes = () => {
    const router = new Router();

    console.debug("User route calling....");

    router.use("/v1/user", userRoutes({ authenticate }));

    router.use("/v1/income", incomeRoutes({ authenticate }));

    router.use("/v1/expense", expenseRoutes({ authenticate }));

    router.use("/v1/saving", savingRoutes({ authenticate }));

    return router;
};

module.exports = routes;
