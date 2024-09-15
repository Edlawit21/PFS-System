const activateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status: "Active" }, // Activate the user
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: "User activated successfully.", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { activateUser };
