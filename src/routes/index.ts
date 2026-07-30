import express = require("express");
import usersRoute = require("./users.route");

const router = express.Router();

router.use("/users", usersRoute);

export = router;