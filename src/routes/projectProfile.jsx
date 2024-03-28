import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios
import ProjectProfile from "../components/ProjectList/ProjectProfile";

const Project = () => {
  return (
    <div>
      <ProjectProfile />
    </div>
  );
};

export default Project;
