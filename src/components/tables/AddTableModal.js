import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Fade,
  Modal,
  Backdrop,
  TextField,
  Typography,
} from "@material-ui/core";
import { db } from "../../helper/firebase";

export default function AddTableModal({
  projectId,
  projectData,
  addTableOpen,
  setAddTableOpen,
  reloadData,
}) {
  const [tableName, setTableName] = useState("");
  const [inputFields, setInputFields] = useState([{ name: "" }]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ name: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].name = event.target.value;

    setInputFields(values);
  };

  const handleSubmit = () => {
    let headers = [];
    inputFields.map((value) => headers.push(value.name));
    db.collection("projects")
      .doc(projectId)
      .get()
      .then((doc) => {
        let data = doc.data();
        data.tables.push({
          name: tableName,
          data: {},
          headers: headers,
        });
        db.collection("projects").doc(projectId).set(data);
      });
    setAddTableOpen(false);
    projectData.tables.push({ name: tableName, data: {}, headers: headers });
  };

  return (
    <Modal
      open={addTableOpen}
      onClose={() => {
        setAddTableOpen(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={addTableOpen}>
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
            <Box>
              <Typography color="textPrimary" variant="h4">
                Add Table
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              name="text"
              type="name"
              value={tableName}
              variant="outlined"
              onChange={(e) => setTableName(e.currentTarget.value)}
            />
            {inputFields.map((inputField, index) => (
              <>
                <TextField
                  key={`dynamicField${index}`}
                  fullWidth
                  label="Field"
                  margin="normal"
                  type="text"
                  value={inputField.name}
                  variant="outlined"
                  onChange={(event) => handleInputChange(index, event)}
                />
                <Button type="button" onClick={() => handleRemoveFields(index)}>
                  -
                </Button>
              </>
            ))}

            <Box sx={{ py: 1 }}>
              <Button
                color="secondary"
                fullWidth
                size="large"
                variant="contained"
                onClick={handleAddFields}
              >
                Add Field
              </Button>
            </Box>
            <Box sx={{ py: 1 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                Create Table
              </Button>
            </Box>
          </Container>
        </Box>
      </Fade>
    </Modal>
  );
}
