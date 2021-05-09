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
  projectId,
  projectData,
  deleteTableOpen,
  setDeleteTableOpen,
}) {
  const [tables, setTables] = useState(projectData.tables);
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
    tobedeleted.map((value) => setTables(tables.splice(value, 1)));

    projectData.tables = tables;

    db.collection("projects").doc(projectId).set(projectData);
    setDeleteTableOpen(false);

    setTables(tables);
  };

  return (
    <Modal
      open={deleteTableOpen}
      onClose={() => {
        setDeleteTableOpen(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={deleteTableOpen}>
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
                Delete Table
              </Typography>
            </Box>
            {tables.map((table, index) => (
              <FormGroup row>
                <FormControlLabel
                  key={`${table}${index}`}
                  control={
                    <Checkbox
                      checked={selectedIds.indexOf(index) !== -1}
                      onChange={(event) => handleSelectOne(event, index)}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label={table.name}
                />
              </FormGroup>
            ))}
            <Box sx={{ py: 1 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                Delete Tables
              </Button>
            </Box>
          </Container>
        </Box>
      </Fade>
    </Modal>
  );
}
