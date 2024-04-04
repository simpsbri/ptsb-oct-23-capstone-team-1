import mongoose from "mongoose";

const projectModel = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    projectTitle: { type: String, required: false },
    details: { type: String, required: false },
    status: { type: String, required: false },
    projectType: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectModel);

export default Project;
