import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    projectId: { type: Number },
    projectTasks: { type: [String] },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: { type: String },
    postedAt: { type: Date },
    status: { type: String },
    languages: { type: [String] },
    bio: { type: String },
    businessId: { type: String }, // FIXME: should be a reference to a business
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
