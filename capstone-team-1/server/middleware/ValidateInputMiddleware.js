const validateProjectData = (req, res, next) => {
  const { projectData } = req.body;
  if (!projectData.name || !projectData.recipient) {
    return res
      .status(400)
      .json({ message: "Missing project name or recipient." });
  }
  next();
};

export default validateProjectData;
