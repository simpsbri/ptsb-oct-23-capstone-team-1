import mongoose from 'mongoose'

const projectModel = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    projectTitle: { type: String, required: true },
    details: { type: String, required: true },
    status: { type: String, required: true },
    tools: [{ type: String }],
  },
  {
    timestamps: true,
  },
)

const Project = mongoose.model('Project', projectModel)

export default Project
