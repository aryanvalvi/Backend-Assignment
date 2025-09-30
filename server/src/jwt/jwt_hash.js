const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const hashedPassword_Creator = async password => {
  console.log(password)
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  console.log(hash)
  return hash
}
const unHashedPassowrd = async (password, hashedPassword) => {
  const unhashed = await bcrypt.compare(password, hashedPassword)
  return unhashed
}

const jwtCreator = async data => {
  const token = jwt.sign({data}, process.env.JWT_SECRET)

  return token
}
const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.auth

  if (!token) return res.status(401).json({error: "Unauthorized"})

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decode

    next()
  } catch (error) {
    res.status(401).json({message: "invalid token ", message: error.message})
  }
}
const checkVerify = (req, res) => {
  const token = req.cookies.auth
  if (!token) return res.json({user: null})
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    res.json({user: decode})
  } catch (error) {
    res.json({user: null})
  }
}
module.exports = {
  hashedPassword_Creator,
  unHashedPassowrd,
  jwtMiddleware,
  jwtCreator,
  checkVerify,
}
