import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

const ProjectProfile = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [projectTitle, setProjectTitle] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("Newly Submitted");
  const [tools, setTools] = useState([]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);

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
        setTools(response.data.tools || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [id]);

  const handleSave = async () => {
    if (!id) {
      console.error("Project ID is undefined");
      return;
    }

    try {
      const projectData = {
        projectTitle,
        details,
        status,
        tools,
      };

      const response = await axios.put(
        `http://localhost:4000/projects/${id}`,
        projectData
      );

      if (response.status === 200) {
        setSaveSuccess(true);
        console.log("Project updated successfully");
        setSaveError(false);
      } else {
        setSaveError(true);
      }
    } catch (error) {
      console.error("An error occurred while updating the project:", error);
      setSaveError(true);
    }
  };

  return (
    <>
      <Box className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid">
        <Typography
          variant="h2"
          component="h1"
          className="text-2xl text-primary_dark_cyan font-bold mb-4"
        >
          Project Profile
        </Typography>
        {saveSuccess && (
          <Alert variant="filled" severity="success">
            Updates saved successfully.
          </Alert>
        )}
        {saveError && (
          <Alert variant="filled" severity="error">
            Updates not successful.
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
                label="Tools"
                value={tools.join(", ")}
                onChange={(e) => setTools(e.target.value.split(", "))}
              />
            </Grid>
          </Grid>

          <Box className="flex mt-4">
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
            <Link to="/projects" style={{ marginLeft: "10px" }}>
              Back to List
            </Link>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ProjectProfile;
