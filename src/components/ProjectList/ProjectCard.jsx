// const ProjectCard = ({ project }) => {
//   const { projectTitle, details, status, tools } = project;

//   // Since 'postedAt' is not directly provided, we'll use 'createdAt' from timestamps
//   // Assume that the 'createdAt' date is being passed after being formatted on retrieval from the database
//   const createdAt = project.createdAt || "Recently"; // Fallback to 'Recently' if not provided

//   // Simplifying tags to only include tools, as the schema doesn't have 'languages' or 'role'
//   const tags = [...tools]; // Spread 'tools' into 'tags'

//   return (
//     <div className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid sm:flex-row">
//       <div className="flex flex-col justify-between ml-4">
//         {/* Project title */}
//         <h1 className="text-xl font-bold cursor-pointer">{projectTitle}</h1>

//         {/* Project details */}
//         <p className="text-base mt-2">{details}</p>

//         {/* Project status */}
//         <p className="flex items-center gap-2 text-dark_gray_cyan text-base">
//           Posted: {new Date(createdAt).toLocaleString()} • Status: {status}
//         </p>
//       </div>

//       {/* Project tools/tags */}
//       <div className="flex flex-wrap items-center mt-4 mx-4 pt-4 border-t border-gray-500 border-solid sm:ml-auto sm:border-0 sm:pt-0">
//         {tags.map((tag, index) => (
//           <span
//             key={`tag-${index}`}
//             className="text-primary_dark_cyan bg-light_grayish_cyan_filter_pill font-bold p-2 rounded mr-4 mb-4 sm:mb-0"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;

// import React from "react";
// import { Link } from "react-router-dom";

// const ProjectCard = ({ project }) => {
//   const { _id, projectTitle, details, status, tools, createdAt } = project;
//   const formattedCreatedAt = createdAt
//     ? new Date(createdAt).toLocaleString()
//     : "Recently";

//   const tags = [...tools]; // Spread 'tools' into 'tags'

//   return (
//     <div className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid sm:flex-row">
//       <div className="flex flex-col justify-between ml-4">
//         {/* Project title with link */}
//         <h1 className="text-xl font-bold cursor-pointer">
//           <Link
//             to={`/projects/${_id}`}
//             className="text-primary_dark_cyan hover:underline"
//           >
//             {projectTitle}
//           </Link>
//         </h1>

//         {/* Project details */}
//         <p className="text-base mt-2">{details}</p>

//         {/* Project status */}
//         <p className="flex items-center gap-2 text-dark_gray_cyan text-base">
//           Posted: {formattedCreatedAt} • Status: {status}
//         </p>
//       </div>

//       {/* Project tools/tags */}
//       <div className="flex flex-wrap items-center mt-4 mx-4 pt-4 border-t border-gray-500 border-solid sm:ml-auto sm:border-0 sm:pt-0">
//         {tags.map((tag, index) => (
//           <span
//             key={`tag-${index}`}
//             className="text-primary_dark_cyan bg-light_grayish_cyan_filter_pill font-bold p-2 rounded mr-4 mb-4 sm:mb-0"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;

import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const { _id, projectTitle, details, status, tools, createdAt } = project;
  const formattedCreatedAt = createdAt
    ? new Date(createdAt).toLocaleString()
    : "Recently";
  const tags = [...tools]; // Spread 'tools' into 'tags'

  return (
    <div className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid sm:flex-row">
      <div className="flex flex-col justify-between ml-4">
        {/* Project title with link */}
        <h1 className="text-xl font-bold cursor-pointer">
          <Link
            to={`/projects/${_id}`}
            className="text-primary_dark_cyan hover:underline"
          >
            {projectTitle}
          </Link>
        </h1>

        {/* Project details */}
        <p className="text-base mt-2">{details}</p>

        {/* Project status */}
        <p className="flex items-center gap-2 text-dark_gray_cyan text-base">
          Posted: {formattedCreatedAt} • Status: {status}
        </p>
      </div>

      {/* Project tools/tags */}
      <div className="flex flex-wrap items-center mt-4 mx-4 pt-4 border-t border-gray-500 border-solid sm:ml-auto sm:border-0 sm:pt-0">
        {tags.map((tag, index) => (
          <span
            key={`tag-${index}`}
            className="text-primary_dark_cyan bg-light_grayish_cyan_filter_pill font-bold p-2 rounded mr-4 mb-4 sm:mb-0"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
