const Users = require("../../models/Users.js");

const users = async (req, res) => {
  try {
    const users = await Users.find({}).select("-password");
    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const usersFind = async (req, res) => {
  try {
    const searchParam = req.params.param;

    const users = await Users.findOne({
      $or: [
        { username: searchParam },
        { email: searchParam },
        { id: searchParam },
      ],
    }).select("-password");

    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const newRole = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findById(id);
    const { role } = req.body;

    if (Number(role) == 1 || 2 || 3) {
      user.set({ role: role, updatedAt: Date.now() });
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Role updated successfully" });
    }

    res.status(400).json({
      success: false,
      message: "Role only 1, 2 or 3",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { users, usersFind, newRole };
