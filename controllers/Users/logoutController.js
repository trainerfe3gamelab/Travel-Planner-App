module.exports = async (req, res) => {
  // Session Destroy
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to logout" });
    }

    // Clear the cookie
    res.clearCookie("connect.sid");
    res.clearCookie("accessToken");

    res.status(200).json({ success: true, message: "Logged out successfully" });
  });
};
