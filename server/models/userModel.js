import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isBusiness: {
      type: Boolean,
      required: true,
      default: false,
    },
    isCapstone: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: { type: String },
    status: { type: String },
    languages: { type: [String] },
    bio: { type: String },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  },
  {
    timestamps: true,
  },
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
