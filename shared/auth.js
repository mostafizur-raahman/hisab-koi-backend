const Status = require("http-status");

function authenticate() {
    return async (req, res, next) => {
        try {
            console.log("--------------------");

            const token = req.headers.authorization || req.query.token;

            if (!token) {
                return res.status(Status.UNAUTHORIZED).send({
                    message: "Login required",
                });
            }

            const jwtSecret = req.container.resolve("config").jwt_secret;

            const decode = req.container
                .resolve("jwt")
                .verify(token, jwtSecret);

            console.debug("DECODE ", decode);

            if (!decode) {
                return res.status(Status.UNAUTHORIZED).send({
                    message: "Login again",
                });
            }

            let query = {
                isDeleted: false,
            };

            if (decode._id) {
                query._id = decode._id;
            } else if (decode.email) {
                query.email = decode.email;
            }

            console.log("QUERY ", query);

            const user = await req.container
                .resolve("userRepository")
                .findOneByQuery(query);

            if (!user) {
                return res.status(Status.UNAUTHORIZED).send({
                    message: "User not found",
                });
            }

            // const userRole = await req.container
            //     .resolve("roleRepository")
            //     .findById(user.role);

            // if (permission) {
            //     console.debug(
            //         "Permission provided, checking permission for %s",
            //         permission
            //     );

            //     isPermitted = req.container
            //         .resolve("roleRepository")
            //         .checkPermission(permission, userRole.permissionString);
            // } else {
            //     console.debug(
            //         "No permission provided, skipping permission check"
            //     );

            //     isPermitted = true;
            // }

            req.user = user;
            // req.userRole = userRole;
            console.debug(
                `${
                    user.email
                        ? user.email
                        : user.firstName + " " + user.lastName
                }`,
                "is authenticated"
            );

            return (isPermitted = true
                ? next()
                : res.status(Status.UNAUTHORIZED).send({
                      message: "Login again",
                  }));
        } catch (error) {
            console.log(error);

            const errorMessages = {
                "jwt malformed": "Login again",
                "jwt expired": "Login again",
                default: "Login required",
            };

            const message =
                errorMessages[error.message] || errorMessages.default;
            const status = Status.UNAUTHORIZED;

            return res.status(status).send({ message });
        }
    };
}

module.exports = authenticate;
