const mongoose = require('mongoose');

const projectModel = mongoose.Schema(
  {
    projectTitle: { type: String, required: true },
    projectDetails: { type: String, required: true },
    projectStatus: { type: String, required: true },
    projectTools: { type: String, required: true },
    projectId: { type: Number, required: true },
    projectTasks: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectModel);

module.exports = Project;
