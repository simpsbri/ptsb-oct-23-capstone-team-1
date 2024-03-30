import ProjectCard from "./ProjectCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:4000/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:4000/projects/${projectId}`);
      // Filter out the deleted project from the current state to update the UI
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <>
      <div className="min-w-full flex flex-col items-center mx-auto w-4/5">
        <div className="font-bold mb-4 flex justify-between w-full px-4">
          <div className="font-bold text-center mx-auto">Projects</div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/projects/createNewProject")}
          >
            Create New Project
          </Button>
        </div>
        <div className="flex flex-col w-full px-4">
          {projects.map((project) => (
            <ProjectCard
              project={project}
              key={project._id}
              onDelete={deleteProject}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectList;
