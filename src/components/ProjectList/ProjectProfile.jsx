import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ProjectProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [projectTitle, setProjectTitle] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("");
  const [projectType, setProjectType] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get("http://localhost:4000/businesses");
        setBusinesses(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchBusinesses();
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/projects/${id}`
        );
        setProject(response.data);
        setProjectTitle(response.data.projectTitle || "");
        setDetails(response.data.details || "");
        setStatus(response.data.status || "");
        setProjectType(response.data.projectType || "");
        setSelectedBusiness(response.data.businessId || "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [id]);

  const handleSave = async () => {
    try {
      const projectData = {
        projectTitle,
        details,
        status,
        projectType,
        businessId: selectedBusiness,
      };
      const response = await axios.put(
        `http://localhost:4000/projects/${id}`,
        projectData
      );
      if (response.status === 200) {
        setSaveSuccess(true);
        setSaveError(false);
      } else {
        setSaveError(true);
      }
    } catch (error) {
      console.error("An error occurred while updating the project:", error);
      setSaveError(true);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/projects/${id}`);
      navigate("/admin/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <Box className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography
            variant="h2"
            component="h1"
            className="text-2xl font-bold mb-4"
          >
            Project Profile
          </Typography>
        </Grid>
        <Grid item>
          <Button
            startIcon={<DeleteIcon />}
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete Project
          </Button>
        </Grid>
      </Grid>

      {saveSuccess && (
        <Alert severity="success">Project updated successfully.</Alert>
      )}
      {saveError && (
        <Alert severity="error">
          An error occurred while updating the project.
        </Alert>
      )}

      <form onSubmit={(event) => event.preventDefault()}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Details"
              multiline
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="Newly Submitted">Newly Submitted</MenuItem>
                <MenuItem value="Under Review">Under Review</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Assigned">Assigned</MenuItem>
                <MenuItem value="Denied">Denied</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Type"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="business-select-label">Business</InputLabel>
              <Select
                labelId="business-select-label"
                id="business-select"
                value={selectedBusiness}
                onChange={(e) => setSelectedBusiness(e.target.value)}
                label="Business"
              >
                {businesses.map((business) => (
                  <MenuItem key={business._id} value={business._id}>
                    {business.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
          >
            Save
          </Button>
          <Link to="/admin/projects" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Back to List</Button>
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default ProjectProfile;

// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Alert,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const modules = {
//   toolbar: [
//     ["bold", "italic", "underline", "strike"],
//     ["blockquote", "code-block"],
//     [{ header: 1 }, { header: 2 }],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ script: "sub" }, { script: "super" }],
//     [{ indent: "-1" }, { indent: "+1" }],
//     [{ direction: "rtl" }],
//     [{ size: ["small", false, "large", "huge"] }],
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     [{ color: [] }, { background: [] }],
//     [{ font: [] }],
//     [{ align: [] }],
//     ["clean"],
//     ["link", "image", "video"],
//   ],
// };

// const ProjectProfile = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [project, setProject] = useState({
//     projectTitle: "",
//     details: "",
//     status: "",
//     projectType: "",
//     businessId: "",
//   });
//   const [businesses, setBusinesses] = useState([]);
//   const [statusOptions, setStatusOptions] = useState([
//     "Newly Submitted",
//     "Under Review",
//     "Approved",
//     "Completed",
//     "Archived",
//   ]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const projectResponse = await axios.get(
//           `http://localhost:4000/projects/${id}`
//         );
//         setProject(projectResponse.data);

//         const businessesResponse = await axios.get(
//           "http://localhost:4000/businesses"
//         );
//         setBusinesses(businessesResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleSave = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:4000/projects/${id}`,
//         project
//       );
//       if (response.status === 200) {
//         alert("Project updated successfully");
//         navigate("/admin/projects");
//       } else {
//         console.error("Failed to update the project.");
//       }
//     } catch (error) {
//       console.error("Error updating project:", error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:4000/projects/${id}`);
//       navigate("/admin/projects");
//     } catch (error) {
//       console.error("Error deleting project:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProject((prevProject) => ({
//       ...prevProject,
//       [name]: value,
//     }));
//   };

//   return (
//     <Box className="my-5 mx-auto p-6 bg-white shadow-md rounded-md">
//       <Grid
//         container
//         spacing={2}
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         <Grid item>
//           <Typography variant="h4" component="h1">
//             Project Profile
//           </Typography>
//         </Grid>
//         <Grid item>
//           <Button
//             startIcon={<DeleteIcon />}
//             variant="contained"
//             color="error"
//             onClick={handleDelete}
//           >
//             Delete Project
//           </Button>
//         </Grid>
//       </Grid>

//       <Grid container spacing={2} mt={2}>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Project Title"
//             name="projectTitle"
//             value={project.projectTitle}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <FormControl fullWidth>
//             <InputLabel>Status</InputLabel>
//             <Select
//               name="status"
//               value={project.status}
//               onChange={handleChange}
//             >
//               {statusOptions.map((status) => (
//                 <MenuItem key={status} value={status}>
//                   {status}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Project Type"
//             name="projectType"
//             value={project.projectType}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <FormControl fullWidth>
//             <InputLabel>Business</InputLabel>
//             <Select
//               name="businessId"
//               value={project.businessId}
//               onChange={handleChange}
//             >
//               {businesses.map((business) => (
//                 <MenuItem key={business._id} value={business._id}>
//                   {business.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="h6">Project Details</Typography>
//           <ReactQuill
//             theme="snow"
//             value={project.details}
//             onChange={(content) => setProject({ ...project, details: content })}
//             modules={modules}
//             style={{ height: "300px" }} // Adjusted height
//           />
//         </Grid>
//       </Grid>

//       <Box mt={2} display="flex" justifyContent="space-between">
//         <Button variant="contained" color="primary" onClick={handleSave}>
//           Save
//         </Button>
//         <Link to="/admin/projects" style={{ textDecoration: "none" }}>
//           <Button variant="outlined">Back to List</Button>
//         </Link>
//       </Box>
//     </Box>
//   );
// };

// export default ProjectProfile;

// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Alert,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// const ProjectProfile = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [project, setProject] = useState({
//     projectTitle: "",
//     details: "",
//     status: "",
//     projectType: "",
//     businessId: "",
//   });
//   const [businesses, setBusinesses] = useState([]);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [saveError, setSaveError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const projectRes = await axios.get(
//           `http://localhost:4000/projects/${id}`
//         );
//         const businessesRes = await axios.get(
//           "http://localhost:4000/businesses"
//         );

//         setProject(projectRes.data);
//         setBusinesses(businessesRes.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProject((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:4000/projects/${id}`,
//         project
//       );
//       if (response.status === 200) {
//         setSaveSuccess(true);
//         setTimeout(() => setSaveSuccess(false), 3000);
//         // Optionally redirect or fetch project data again here
//       } else {
//         setSaveError(true);
//       }
//     } catch (error) {
//       console.error("An error occurred while updating the project:", error);
//       setSaveError(true);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:4000/projects/${id}`);
//       navigate("/admin/projects");
//     } catch (error) {
//       console.error("Error deleting project:", error);
//     }
//   };

//   return (
//     <Box className="my-5 mx-auto p-6 bg-white shadow-md rounded-md">
//       <Grid container justifyContent="space-between" alignItems="center">
//         <Grid item>
//           <Typography
//             variant="h2"
//             component="h1"
//             className="text-2xl font-bold mb-4"
//           >
//             Project Profile
//           </Typography>
//         </Grid>
//         <Grid item>
//           <Button
//             startIcon={<DeleteIcon />}
//             variant="contained"
//             color="error"
//             onClick={handleDelete}
//           >
//             Delete Project
//           </Button>
//         </Grid>
//       </Grid>

//       {saveSuccess && (
//         <Alert severity="success">Project updated successfully.</Alert>
//       )}
//       {saveError && (
//         <Alert severity="error">
//           An error occurred while updating the project.
//         </Alert>
//       )}

//       <form onSubmit={(event) => event.preventDefault()}>
//         <Grid container spacing={2}>
//           <TextField
//             fullWidth
//             label="Project Title"
//             name="projectTitle"
//             value={project.projectTitle}
//             onChange={handleInputChange}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Details"
//             name="details"
//             multiline
//             rows={4}
//             value={project.details}
//             onChange={handleInputChange}
//             margin="normal"
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel id="status-select-label">Status</InputLabel>
//             <Select
//               labelId="status-select-label"
//               id="status"
//               name="status"
//               value={project.status}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="Newly Submitted">Newly Submitted</MenuItem>
//               <MenuItem value="Under Review">Under Review</MenuItem>
//               <MenuItem value="Approved">Approved</MenuItem>
//               <MenuItem value="Assigned">Assigned</MenuItem>
//               <MenuItem value="Denied">Denied</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             fullWidth
//             label="Project Type"
//             name="projectType"
//             value={project.projectType}
//             onChange={handleInputChange}
//             margin="normal"
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel id="business-select-label">Business</InputLabel>
//             <Select
//               labelId="business-select-label"
//               id="business-select"
//               name="businessId"
//               value={project.businessId}
//               onChange={handleInputChange}
//             >
//               {businesses.map((business) => (
//                 <MenuItem key={business._id} value={business._id}>
//                   {business.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//             <Button
//               onClick={handleSave}
//               variant="contained"
//               color="primary"
//               sx={{ mr: 2 }}
//             >
//               Save
//             </Button>
//             <Link to="/admin/projects" style={{ textDecoration: "none" }}>
//               <Button variant="outlined">Back to List</Button>
//             </Link>
//           </Box>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default ProjectProfile;
