const {
  hashedPassword_Creator,
  unHashedPassowrd,
  jwtCreator,
} = require("../jwt/jwt_hash")
const User = require("../model/credential")

const register = async (req, res) => {
  const {email, password, admin} = req.body
  console.log(email, password, admin)
  if (!email || !password) {
    return res.status(401).json({message: "please fill both the credentials"})
  }
  try {
    const is_already_register = await User.findOne({email: email})
    if (is_already_register) {
      res
        .status(401)
        .json({message: "User is already registered, please login"})
    }
    const hashedPassword = await hashedPassword_Creator(password)
    let new_entry
    if (admin) {
      new_entry = await User.create({
        email: email,
        password: hashedPassword,
        role: "admin",
      })
    } else {
      new_entry = await User.create({
        email: email,
        password: hashedPassword,
        role: "user",
      })
    }
    const jwtToken = await jwtCreator(new_entry)
    res.cookie("auth", jwtToken, {
      maxAge: 1000 * 60 * 60 * 24,
    })
    new_entry.save()
    res
      .status(200)
      .json({message: "user is successfully register", user: new_entry})
  } catch (error) {
    res.status(500).json({message: "server error bro", error})
  }
}
const login = async (req, res) => {
  const {email, password} = req.body
  if (!email || !password) {
    res.status(401).json({message: "please fill both the credentials"})
  }
  try {
    const user = await User.findOne({email})
    if (!user) return res.status(401).json({message: "user is not registered"})
    const password_match = await unHashedPassowrd(password, user.password)
    if (!password_match) {
      return res.status(401).json({message: "please enter right password"})
    }
    const jwtToken = await jwtCreator(user)

    res.cookie("auth", jwtToken, {
      maxAge: 1000 * 60 * 60 * 24,
    })

    res.status(200).json({message: "login successfully", user: user})
  } catch (error) {
    res.status(500).json({message: "server error bro", error})
  }
}
module.exports = {register, login}
