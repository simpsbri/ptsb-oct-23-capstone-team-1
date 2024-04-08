// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// // Assume AuthContext is correctly set up and exported from the given path
// import { AuthContext } from "../../../server/middleware/setAuth";

// function ProjectProfileBlank() {
//   // State hooks for project information
//   const [projectTitle, setProjectTitle] = useState("");
//   const [details, setDetails] = useState("");
//   const [status, setStatus] = useState("Newly Submitted");
//   const [projectType, setProjectType] = useState("");
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedBusiness, setSelectedBusiness] = useState("");

//   // useContext hook to use the authentication context
//   const { auth } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // Effect hook to fetch businesses on component mount
//   useEffect(() => {
//     axios
//       .get(`${viteUrl}businesses`)
//       .then((response) => {
//         setBusinesses(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching businesses:", error);
//       });
//   }, []);

//   // Function to handle form submission
//   async function handleSave(event) {
//     event.preventDefault();
//     const newProject = {
//       projectTitle,
//       details,
//       status,
//       projectType,
//       businessId: selectedBusiness,
//     };

//     try {
//       await axios.post(
//         `${viteUrl}projects/createNewProject`,
//         newProject
//       );
//       navigate("/admin/projects");
//     } catch (error) {
//       console.error("Error saving the new project:", error);
//     }
//   }

//   return (
//     <>
//       <Box className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid">
//         <Typography
//           variant="h2"
//           component="h1"
//           className="text-2xl text-primary_dark_cyan font-bold mb-4"
//         >
//           Create New Project (Blank)
//         </Typography>

//         <form onSubmit={handleSave}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Project Title"
//                 value={projectTitle}
//                 onChange={(e) => setProjectTitle(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Details"
//                 multiline
//                 rows={4}
//                 value={details}
//                 onChange={(e) => setDetails(e.target.value)}
//               />
//             </Grid>
//             {auth.user.isAdmin === "Admin" && (
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id="status-select-label">Status</InputLabel>
//                   <Select
//                     labelId="status-select-label"
//                     id="status"
//                     value={status}
//                     label="Status"
//                     onChange={(e) => setStatus(e.target.value)}
//                     // disabled={auth.user.isAdmin !== "Admin"} // Conditionally disable based on admin status
//                   >
//                     <MenuItem value="Newly Submitted">Newly Submitted</MenuItem>
//                     <MenuItem value="Under Review">Under Review</MenuItem>
//                     <MenuItem value="Approved">Approved</MenuItem>
//                     <MenuItem value="Assigned">Assigned</MenuItem>
//                     <MenuItem value="Denied">Denied</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//             )}
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Project Type"
//                 value={projectType}
//                 onChange={(e) => setProjectType(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel id="business-select-label">Business</InputLabel>
//                 <Select
//                   labelId="business-select-label"
//                   id="business-select"
//                   value={selectedBusiness}
//                   onChange={(e) => setSelectedBusiness(e.target.value)}
//                 >
//                   {businesses.map((business) => (
//                     <MenuItem value={business._id} key={business._id}>
//                       {business.company_name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>

//           <Box className="flex mt-4">
//             <Button type="submit" variant="contained" color="primary">
//               Save
//             </Button>
//             <Button
//               onClick={() => navigate("/admin/projects")}
//               style={{ marginLeft: "10px" }}
//               variant="outlined"
//             >
//               Back to List
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </>
//   );
// }

// export default ProjectProfileBlank;

import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { AuthContext } from '../../../server/middleware/setAuth'
import ReactQuill from 'react-quill' // Import ReactQuill here
import 'react-quill/dist/quill.snow.css' // Import the CSS for ReactQuill
const viteUrl = import.meta.env.VITE_WEB_ADDRESS

function ProjectProfileBlank() {
  // State hooks for project information
  const [projectTitle, setProjectTitle] = useState('')
  const [details, setDetails] = useState('') // This will be used by ReactQuill
  const [status, setStatus] = useState('Newly Submitted')
  const [projectType, setProjectType] = useState('')
  const [businesses, setBusinesses] = useState([])
  const [selectedBusiness, setSelectedBusiness] = useState('')

  // useContext hook to use the authentication context
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()

  // Effect hook to fetch businesses on component mount
  useEffect(() => {
    axios
      .get(`${viteUrl}businesses`)
      .then((response) => {
        setBusinesses(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching businesses:', error)
      })
  }, [])

  // Configuration for the ReactQuill toolbar
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button
      ['link', 'image', 'video'], // link and image, video
    ],
  }

  // Function to handle form submission
  async function handleSave(event) {
    event.preventDefault()
    const newProject = {
      projectTitle,
      details,
      status,
      projectType,
      businessId: selectedBusiness,
    }

    try {
      await axios.post(`${viteUrl}projects/createNewProject`, newProject)
      navigate('/admin/projects')
    } catch (error) {
      console.error('Error saving the new project:', error)
    }
  }

  return (
    <>
      <Box className='flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid'>
        <Typography
          variant='h2'
          component='h1'
          className='text-2xl text-primary_dark_cyan font-bold mb-4'
        >
          Create New Project (Blank)
        </Typography>

        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Project Title'
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
            </Grid>
            {auth.user.isAdmin === 'Admin' && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select-label'>Status</InputLabel>
                  <Select
                    labelId='status-select-label'
                    id='status'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label='Status'
                  >
                    <MenuItem value='Newly Submitted'>Newly Submitted</MenuItem>
                    <MenuItem value='Under Review'>Under Review</MenuItem>
                    <MenuItem value='Approved'>Approved</MenuItem>
                    <MenuItem value='Assigned'>Assigned</MenuItem>
                    <MenuItem value='Denied'>Denied</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Project Type'
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='business-select-label'>Business</InputLabel>
                <Select
                  labelId='business-select-label'
                  id='business-select'
                  value={selectedBusiness}
                  onChange={(e) => setSelectedBusiness(e.target.value)}
                  label='Business'
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
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              Project Details
            </Typography>
            <ReactQuill
              theme='snow'
              value={details}
              onChange={setDetails}
              modules={modules}
              style={{ height: '200px', marginBottom: '20px' }}
            />
          </Grid>

          <Box className='flex mt-4'>
            <Button
              onClick={handleSave}
              variant='contained'
              color='primary'
              sx={{ mr: 2 }}
              style={{ marginTop: '25px' }}
            >
              Save
            </Button>
            <Button
              onClick={() => navigate('/admin/projects')}
              style={{ marginLeft: '10px', marginTop: '25px' }}
              variant='outlined'
            >
              Back to List
            </Button>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default ProjectProfileBlank
