import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Button,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Logout as LogoutIcon,
} from "@material-ui/icons";

import { auth } from "../helper/firebase";
import AddProjectModal from "../components/project/AddProjectModal";
import DeleteProjectModal from "../components/project/DeleteProjectModal";

export const Project = ({
  projectId,
  setProjectId,
  projectsData,
  addNewProject,
  reloadData,
}) => {
  const history = useHistory();

  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [deleteProjectOpen, setDeleteProjectOpen] = useState(false);

  function checkAuthAndDetails() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
  }

  checkAuthAndDetails();

  return (
    <>
      <AddProjectModal
        addProjectOpen={addProjectOpen}
        addNewProject={addNewProject}
        setAddProjectOpen={setAddProjectOpen}
      />
      <DeleteProjectModal
        projectsData={projectsData}
        deleteProjectOpen={deleteProjectOpen}
        setDeleteProjectOpen={setDeleteProjectOpen}
        reloadData={reloadData}
      />
      <AppBar>
        <Toolbar>
          <IconButton onClick={() => setAddProjectOpen(true)}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={() => setDeleteProjectOpen(true)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              auth.signOut().then(() => {
                setProjectId("");
                history.push("/login");
              })
            }
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          backgroundColor: "background.default",
          height: "100%",
          mt: "100px",
          padding: "1rem",
        }}
      >
        <Container>
          <Grid container spacing={3}>
            {Object.keys(projectsData).map((projectId) => (
              <Grid item xs={4} key={projectId}>
                <Button
                  style={{ height: "100%", padding: "10px" }}
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setProjectId(projectId);
                    history.push("/dashboard");
                  }}
                >
                  {projectsData[projectId].name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
