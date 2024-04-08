import asyncHandler from 'express-async-handler'
import generateToken from '../config/generateToken.js'
import User from '../models/userModel.js'

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      pic: user.pic,
      token: generateToken(user._id),
      businessId: user.businessId,
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})
