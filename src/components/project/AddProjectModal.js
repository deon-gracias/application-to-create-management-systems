import { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Container,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { auth, db } from "../../helper/firebase";

export default function AddProjectModal(addProjectOpen, setAddProjectOpen) {
  const [projectName, setProjectName] = useState("");

  function handleAddProject() {
    if (projectName === "") {
      alert("Name field cannot be empty");
    } else {
      //   db.collection("projects").doc().set({ name: projectName });
      console.log({ name: projectName, tables: [], uid: auth.currentUser.uid });
      setAddProjectOpen(false);
    }
  }

  return (
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
          }}
        >
          <Container maxWidth="sm">
            <Box sx={{ mb: "15px" }}>
              <Typography color="textPrimary" variant="h4">
                Add Project
              </Typography>
            </Box>{" "}
            <TextField
              fullWidth
              label="Project Name"
              variant="filled"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />{" "}
            <Button
              color="primary"
              fullWidth
              size="large"
              variant="contained"
              onClick={handleAddProject}
            >
              Add
            </Button>
          </Container>
        </Box>
      </Fade>
    </Modal>
  );
}
