const User = require("../model/credential")
const TextPost = require("../model/post")

const profile = async (req, res) => {
  const getUser = req.user

  try {
    const userId = getUser.data._id
    const user = await User.findById(userId)
    const posts = await TextPost.find({author: userId}).sort({createdAt: -1})
    res.status(200).json({user, posts})
  } catch (error) {
    res.status(500).json({message: "server error", error: error.message})
  }
}

const logout = (req, res) => {
  res.clearCookie("auth", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false, // Set to true in production
  })
  res.status(200).json({message: "Logged out successfully"})
}
module.exports = {profile, logout}
