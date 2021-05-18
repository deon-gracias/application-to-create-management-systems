import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Button,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Toolbar,
  Typography,
  TextField,
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Logout as LogoutIcon,
} from "@material-ui/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { auth } from "../helper/firebase";

export const Project = ({
  projectId,
  setProjectId,
  projectsData,
  addNewProject,
}) => {
  const history = useHistory();

  const [addProjectOpen, setAddProjectOpen] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
    if (projectId !== "") {
      history.push("/dashboard");
    }
  });

  return (
    <>
      <AddProjectModal />
      <AppBar>
        <Toolbar>
          <IconButton onClick={() => setAddProjectOpen(true)}>
            <AddIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              auth.signOut().then(() => {
                history.push("/login");
              })
            }
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {AddProjectModal(addProjectOpen, setAddProjectOpen, addNewProject)}
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

function AddProjectModal  (addProjectOpen, setAddProjectOpen, addNewProject) {return (
  <Modal
    open={addProjectOpen}
    onClose={() => {
      setAddProjectOpen(false);
    }}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={addProjectOpen}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "5px",
          boxShadow: 24,
          p: 4,
          display: "grid",
          gap: "15px",
        }}
      >
        <Typography id="transition-modal-title" variant="h3">
          Add Project
        </Typography>
        <Formik
          initialValues={{
            projectName: "",
          }}
          validationSchema={Yup.object().shape({
            projectName: Yup.string()
              .max(255)
              .required("Project Name is required"),
          })}
          onSubmit={(values) => {
            addNewProject({
              name: values.projectName,
              uid: auth.currentUser.uid,
              tables: [],
            });
            setAddProjectOpen(false);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                error={Boolean(touched.projectName && errors.projectName)}
                fullWidth
                helperText={touched.projectName && errors.projectName}
                label="Project Name"
                margin="normal"
                name="projectName"
                onBlur={handleBlur}
                onChange={handleChange}
                type="projectName"
                value={values.projectName}
                variant="outlined"
              />
              <Button
                variant="contained"
                type="submit"
                onClick={() => console.log()}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Fade>
  </Modal>
)}
