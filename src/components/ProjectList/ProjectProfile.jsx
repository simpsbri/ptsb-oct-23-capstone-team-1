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

// const ProjectProfile = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [project, setProject] = useState({});
//   const [projectTitle, setProjectTitle] = useState("");
//   const [details, setDetails] = useState("");
//   const [status, setStatus] = useState("");
//   const [projectType, setProjectType] = useState("");
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [saveError, setSaveError] = useState(false);
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedBusiness, setSelectedBusiness] = useState("");

//   useEffect(() => {
//     const fetchBusinesses = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/businesses");
//         setBusinesses(response.data);
//       } catch (error) {
//         console.error("There was an error!", error);
//       }
//     };

//     fetchBusinesses();
//   }, []);

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:4000/projects/${id}`
//         );
//         setProject(response.data);
//         setProjectTitle(response.data.projectTitle || "");
//         setDetails(response.data.details || "");
//         setStatus(response.data.status || "");
//         setProjectType(response.data.projectType || "");
//         setSelectedBusiness(response.data.businessId || "");
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProject();
//   }, [id]);

//   const handleSave = async () => {
//     try {
//       const projectData = {
//         projectTitle,
//         details,
//         status,
//         projectType,
//         businessId: selectedBusiness,
//       };
//       const response = await axios.put(
//         `http://localhost:4000/projects/${id}`,
//         projectData
//       );
//       if (response.status === 200) {
//         setSaveSuccess(true);
//         setSaveError(false);
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

//   const modules = {
//     toolbar: [
//       ["bold", "italic", "underline", "strike"],
//       ["blockquote", "code-block"],
//       [{ header: 1 }, { header: 2 }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ script: "sub" }, { script: "super" }],
//       [{ indent: "-1" }, { indent: "+1" }],
//       [{ direction: "rtl" }],
//       [{ size: ["small", false, "large", "huge"] }],
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       [{ color: [] }, { background: [] }],
//       [{ font: [] }],
//       [{ align: [] }],
//       ["clean"],
//       ["link", "image", "video"],
//     ],
//   };

//   return (
//     <Box className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md">
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
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Project Title"
//               value={projectTitle}
//               onChange={(e) => setProjectTitle(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel id="status-select-label">Status</InputLabel>
//               <Select
//                 labelId="status-select-label"
//                 id="status"
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 label="Status"
//               >
//                 <MenuItem value="Newly Submitted">Newly Submitted</MenuItem>
//                 <MenuItem value="Under Review">Under Review</MenuItem>
//                 <MenuItem value="Approved">Approved</MenuItem>
//                 <MenuItem value="Assigned">Assigned</MenuItem>
//                 <MenuItem value="Denied">Denied</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Project Type"
//               value={projectType}
//               onChange={(e) => setProjectType(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel id="business-select-label">Business</InputLabel>
//               <Select
//                 labelId="business-select-label"
//                 id="business-select"
//                 value={selectedBusiness}
//                 onChange={(e) => setSelectedBusiness(e.target.value)}
//                 label="Business"
//               >
//                 {businesses.map((business) => (
//                   <MenuItem key={business._id} value={business._id}>
//                     {business.company_name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>

//         <Typography variant="h6" gutterBottom>
//           Project Details
//         </Typography>
//         <ReactQuill
//           theme="snow"
//           value={details}
//           onChange={setDetails}
//           modules={modules}
//           style={{ height: "200px", marginBottom: "20px" }}
//         />

//         <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
//           <Button
//             onClick={handleSave}
//             variant="contained"
//             color="primary"
//             sx={{ mr: 2 }}
//             style={{ marginTop: "25px" }}
//           >
//             Save
//           </Button>
//           <Link
//             to="/admin/projects"
//             style={{ textDecoration: "none", marginTop: "25px" }}
//           >
//             <Button variant="outlined">Back to List</Button>
//           </Link>
//         </Box>
//       </form>
//     </Box>
//   );
// };

// export default ProjectProfile;

import React, { useState, useEffect, useContext } from "react";
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
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../../../server/middleware/setAuth"; // Ensure this path is correct for your project structure

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
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:4000/businesses")
      .then((response) => {
        setBusinesses(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching businesses:", error);
      });

    axios
      .get(`http://localhost:4000/projects/${id}`)
      .then((response) => {
        const data = response.data;
        setProject(data);
        setProjectTitle(data.projectTitle || "");
        setDetails(data.details || "");
        setStatus(data.status || "");
        setProjectType(data.projectType || "");
        setSelectedBusiness(data.businessId || "");
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
      });
  }, [id]);

  const handleSave = async () => {
    const projectData = {
      projectTitle,
      details,
      status,
      projectType,
      businessId: selectedBusiness,
    };

    try {
      await axios.put(`http://localhost:4000/projects/${id}`, projectData);
      setSaveSuccess(true);
      setSaveError(false);
      setTimeout(() => navigate("/admin/projects"), 2000); // Redirect after a successful save
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

  // Define the React-Quill modules configuration outside of the component
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["link", "image", "video"],
    ],
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
        {auth.isAdmin === "Admin" && (
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
        )}
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
          {/* Form fields go here */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
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
                disabled={auth.isAdmin !== "Admin"}
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
              >
                {businesses.map((business) => (
                  <MenuItem key={business._id} value={business._id}>
                    {business.company_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom>
          Project Details
        </Typography>
        <ReactQuill
          theme="snow"
          value={details}
          onChange={setDetails}
          modules={modules}
          style={{ height: "200px", marginBottom: "20px" }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            style={{ marginTop: "25px" }}
          >
            Save
          </Button>
          <Link
            to="/admin/projects"
            style={{ textDecoration: "none", marginTop: "25px" }}
          >
            <Button variant="outlined">Back to List</Button>
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default ProjectProfile;

// dangerouslySetInnerHTML={{ __html: message.messageText }}
// .substring(0, 50),
