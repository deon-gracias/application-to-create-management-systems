import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Checkbox,
  Fade,
  FormGroup,
  FormControlLabel,
  Modal,
  Backdrop,
  Typography,
} from "@material-ui/core";
import { db } from "../../helper/firebase";

export default function DeleteTableModal({
  projectsData,
  deleteProjectOpen,
  setDeleteProjectOpen,
  reloadData,
}) {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = newSelectedIds.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedIds = newSelectedIds.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1)
      );
    }
    setSelectedIds(newSelectedIds);
  };

  const handleSubmit = () => {
    let tobedeleted = [...selectedIds].reverse();
    console.log(projectsData);

    tobedeleted.map((value) => db.collection("projects").doc(value).delete());

    reloadData();
    console.log(projectsData);
  };

  return (
    <Modal
      open={deleteProjectOpen}
      onClose={() => {
        setDeleteProjectOpen(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={deleteProjectOpen}>
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
          <Container maxWidth="sm">
            <Box sx={{ mb: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Delete Project
              </Typography>
            </Box>
            {Object.keys(projectsData).map((projectId, index) => {
              let project = projectsData[projectId];
              return (
                <FormGroup row>
                  <FormControlLabel
                    key={`${project.name}${index}`}
                    control={
                      <Checkbox
                        checked={selectedIds.indexOf(projectId) !== -1}
                        onChange={(event) => handleSelectOne(event, projectId)}
                        name="checkedB"
                        color="secondary"
                      />
                    }
                    label={project.name}
                  />
                </FormGroup>
              );
            })}
            {/* {projectsData.map((project, index) => (
              <FormGroup row>
                <FormControlLabel
                  key={`${project}${index}`}
                  control={
                    <Checkbox
                      checked={selectedIds.indexOf(index) !== -1}
                      onChange={(event) => handleSelectOne(event, index)}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label={project.name}
                />
              </FormGroup>
            ))} */}
            <Box sx={{ py: 1 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                Delete projects
              </Button>
            </Box>
          </Container>
        </Box>
      </Fade>
    </Modal>
  );
}
