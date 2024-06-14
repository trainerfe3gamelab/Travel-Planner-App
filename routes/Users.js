const express = require("express");
const router = express.Router();

const {
  users,
  usersFind,
  newRole,
} = require("../controllers/SuperAdmin/usersController");

const { isSuperAdmin } = require("../middleware/roleMiddleware");

router.get("/", isSuperAdmin, users);
router.get("/search/:param", isSuperAdmin, usersFind);
router.patch("/:id", isSuperAdmin, newRole);

module.exports = router;
