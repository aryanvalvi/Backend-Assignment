const express = require("express")
const {register, login} = require("../controller/register_login")
const {jwtMiddleware, checkVerify} = require("../jwt/jwt_hash")
const {
  createPost,
  updatePost,
  deletePost,
  getPost,
} = require("../controller/post")
const {logout, profile} = require("../controller/profile")
const {userProfile, admin_Post, isAdmin} = require("../controller/admin")
const router = express.Router()

router.get("/test", (req, res) => {
  res.json({message: "server route is working"})
})

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/profile", jwtMiddleware, profile)
router.get("/checkUser", checkVerify)
router.post("/createpost", jwtMiddleware, createPost)
router.put("/createpost/:id", jwtMiddleware, updatePost)
router.delete("/createpost/:id", jwtMiddleware, deletePost)
router.get("/getpost", getPost)
router.get("/admin", jwtMiddleware, userProfile)
router.delete("/deletePost/:id", jwtMiddleware, admin_Post)
router.get("/isadmin", jwtMiddleware, isAdmin)
module.exports = router
