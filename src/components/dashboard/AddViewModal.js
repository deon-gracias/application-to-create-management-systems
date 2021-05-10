import { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Container,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

export default function AddViewModal({
  projectData,
  views,
  setViews,
  addViewOpen,
  setAddViewOpen,
}) {
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const [header, setHeader] = useState("");
  const [display, setDisplay] = useState("");

  let tablesAndHeaders = {};

  function mapTablesAndHeaders() {
    projectData.tables.map(
      (tableData, index) =>
        (tablesAndHeaders[`${tableData.name}${index}`] = {
          headers: tableData.headers,
          data: Object.values(tableData.data),
        })
    );
  }

  function handleAddView() {
    if (name === "" || table === "" || header === "" || display === "") {
      alert("Please Choose Fill all the Fields");
      return;
    } else if (views.includes(name)) {
      alert("View with given name already exists");
      return;
    } else {
      let headerIndex = tablesAndHeaders[table].headers.indexOf(header);
      let headerData = [];
      let continueSearch = true;
      for (let element in tablesAndHeaders[table]["data"]) {
        if (continueSearch) {
          continueSearch =
            continueSearch && isNumeric(element[headerIndex]) ? true : false;
          headerData.push(
            parseFloat(tablesAndHeaders[table]["data"][element][headerIndex])
          );
        } else {
          alert(
            "All data in given header are not numeric.\nCannot create view."
          );
          break;
        }
      }
      console.log(headerData);
      if (continueSearch) {
        setViews([
          ...views,
          { name: name, desc: generateViewData(display, headerData) },
        ]);
      }
    }
  }

  function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  }

  function generateViewData(display, data) {
    if (data.length === 0) {
      return;
    } else if (display === "average") {
      return data.reduce((a, b) => a + b) / data.length;
    } else if (display === "sum") {
      return data.reduce((a, b) => a + b);
    }
  }

  mapTablesAndHeaders();

  return (
    <Modal
      open={addViewOpen}
      onClose={() => {
        setAddViewOpen(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={addViewOpen}>
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
                Add View
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Name of View"
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormControl fullWidth variant="filled">
              <InputLabel>Table</InputLabel>
              <Select
                value={table}
                label="table"
                onChange={(e) => setTable(e.target.value)}
              >
                {projectData.tables.map((tableData, index) => (
                  <MenuItem value={`${tableData.name}${index}`}>
                    {tableData.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="filled">
              <InputLabel>Header</InputLabel>
              <Select
                value={header}
                label="header"
                onChange={(e) => setHeader(e.target.value)}
              >
                {table !== ""
                  ? tablesAndHeaders[table].headers.map((headerData, index) => (
                      <MenuItem value={`${headerData}`}>{headerData}</MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="filled">
              <InputLabel>Display</InputLabel>
              <Select
                value={display}
                label="display"
                onChange={(e) => setDisplay(e.target.value)}
              >
                <MenuItem value="average">Average</MenuItem>
                <MenuItem value="sum">Sum</MenuItem>
              </Select>
            </FormControl>

            <Button
              color="primary"
              fullWidth
              size="large"
              variant="contained"
              onClick={handleAddView}
            >
              Add
            </Button>
          </Container>
        </Box>
      </Fade>
    </Modal>
  );
}
