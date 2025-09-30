const User = require("../model/credential")
const TextPost = require("../model/post")

const userProfile = async (req, res) => {
  const getUser = req.user
  console.log(getUser)

  if (!getUser.data.role || !getUser.data.role === "admin") {
    return res.status(401).json({message: "You are not admin"})
  }
  try {
    const allPost = await TextPost.find()
      .sort({createdAt: -1})
      .populate("author")

    res.status(200).json({allPost})
  } catch (error) {
    res.status(500).json({message: "server error", error: error.message})
  }
}
const admin_Post = async (req, res) => {
  console.log("adminpost called")
  try {
    const postId = req.params.id

    const post = await TextPost.findOneAndDelete({
      _id: postId,
    })
    if (!post) {
      return res.status(404).json({error: "Post not found or unauthorized"})
    }
    res.status(200).json({message: "Post deleted"})
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({error: "Failed to delete post", message: error.message})
  }
}
const isAdmin = async (req, res) => {
  const user = req.user
  console.log(user)
  if (!user.data.role || user.data.role === "user") {
    return res.status(401).json({message: "you are not admin", admin: false})
  } else if (user.data.role === "admin") {
    return res.status(200).json({message: "you are admin", admin: true})
  }
}

module.exports = {userProfile, admin_Post, isAdmin}
