import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const ProjectCard = ({ project, onDelete }) => {
  const { _id, projectTitle, details, status, tools, createdAt } = project;

  const formattedCreatedAt = createdAt
    ? new Date(createdAt).toLocaleString()
    : "Recently";

  return (
    <div className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid sm:flex-row">
      <div className="flex flex-col justify-between ml-4">
        <h1 className="text-xl font-bold cursor-pointer">
          <Link
            to={`/projects/${_id}`}
            className="text-primary_dark_cyan hover:underline"
          >
            {projectTitle}
          </Link>
        </h1>
        <p className="text-base mt-2">{details}</p>
        <p className="flex items-center gap-2 text-dark_gray_cyan text-base">
          Posted: {formattedCreatedAt} • Status: {status}
        </p>
      </div>
      <div className="flex flex-wrap items-center mt-4 mx-4 pt-4 border-t border-gray-500 border-solid sm:ml-auto sm:border-0 sm:pt-0">
        {tools.map((tool, index) => (
          <span
            key={`tool-${index}`}
            className="text-primary_dark_cyan bg-light_grayish_cyan_filter_pill font-bold p-2 rounded mr-4 mb-4 sm:mb-0"
          >
            {tool}
          </span>
        ))}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onDelete(project._id)}
        >
          Delete Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
