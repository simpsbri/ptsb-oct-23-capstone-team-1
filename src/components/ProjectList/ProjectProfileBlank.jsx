import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
} from "@mui/material";

function ProjectProfileBlank() {
  const [projectTitle, setProjectTitle] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("Newly Submitted");
  const [tools, setTools] = useState("");

  const navigate = useNavigate();

  async function handleSave(event) {
    event.preventDefault();

    const newProject = {
      projectTitle,
      details,
      status,
      tools: tools.split(", ").map((tool) => tool.trim()),
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/projects/CreateNewProject",
        newProject
      );
      console.log(response.data);
      navigate("/projects");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Box className="flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid">
        <Typography
          variant="h2"
          component="h1"
          className="text-2xl text-primary_dark_cyan font-bold mb-4"
        >
          Create New Project
        </Typography>

        <form onSubmit={handleSave}>
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
                value={tools}
                onChange={(e) => setTools(e.target.value)}
              />
            </Grid>
          </Grid>

          <Box className="flex mt-4">
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              onClick={() => navigate("/projects")}
              style={{ marginLeft: "10px" }}
              variant="outlined"
            >
              Back to List
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default ProjectProfileBlank;
