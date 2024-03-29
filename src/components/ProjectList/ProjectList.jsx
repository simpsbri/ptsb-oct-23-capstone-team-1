import ProjectCard from "./ProjectCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="min-w-full flex flex-col items-center mx-auto w-4/5 h-96">
        <div className="font-bold mb-4 flex justify-between w-full px-4">
          <div>Projects</div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/projects/create")} // Adjust the route as needed
          >
            Create New Project
          </Button>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/ProjectList/CreateNewProject")}
        >
          Create New Project
        </Button>
        <div className="flex flex-col w-full px-4">
          {projects.map((project) => (
            <ProjectCard project={project} key={project._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectList;
