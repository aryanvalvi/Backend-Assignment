const TextPost = require("../model/post")

const createPost = async (req, res) => {
  const {text} = req.body
  const user = req.user
  console.log("user is ", user.data)
  if (!text) return res.json({message: "Please put some text"})
  try {
    const newText = await TextPost({
      content: text,
      author: user.data._id,
    })
    await newText.save()
    res.status(200).json({message: "text posted successfully", post: newText})
  } catch (error) {
    res.status(500).json({message: "server error", error})
  }
}
const updatePost = async (req, res) => {
  const userId = req.user.data._id
  try {
    const postId = req.params.id
    const {content} = req.body

    const post = await TextPost.findOneAndUpdate(
      {_id: postId, author: userId},
      {content, updatedAt: Date.now()},
      {new: true, runValidators: true}
    )

    const onlypost = await TextPost.findById(postId)

    if (!post) {
      return res.status(404).json({error: "Post not found or unauthorized"})
    }
    res.status(200).json({message: "Post updated", post})
  } catch (error) {
    res.status(500).json({error: "Failed to update post"})
  }
}

const getPost = async (req, res) => {
  try {
    const getlist = await TextPost.find().populate("author", "email")
    res.status(200).json({post: getlist})
  } catch (error) {
    res.status(500).json({message: "server error"})
  }
}
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id
    const post = await TextPost.findOneAndDelete({
      _id: postId,
      author: req.user.userData.id,
    })
    if (!post) {
      return res.status(404).json({error: "Post not found or unauthorized"})
    }
    res.status(200).json({message: "Post deleted"})
  } catch (error) {
    res.status(500).json({error: "Failed to delete post"})
  }
}

module.exports = {createPost, getPost, updatePost, deletePost}
