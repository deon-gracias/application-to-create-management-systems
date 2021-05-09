import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { auth } from "../helper/firebase";
import AddViewModal from "./dashboard/AddViewModal";
import { Forms } from "./Forms";

export const Dashboard = ({
  projectId,
  projectData,
  setProjectId,
  reloadData,
}) => {
  const history = useHistory();

  const [addViewOpen, setAddViewOpen] = useState(false);

  function checkAuthAndDetails() {
    if (projectId === "") {
      history.push("/project");
    }
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
  }

  function totalData() {
    let total = 0;
    projectData.tables.forEach(
      (table) =>
        (total += table.headers.length * Object.keys(table.data).length)
    );
    return total;
  }

  checkAuthAndDetails();

  return (
    <Grid container spacing={2}>
      <AddViewModal addViewOpen={addViewOpen} setAddViewOpen={setAddViewOpen} />
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton color="primary" onClick={() => setAddViewOpen(true)}>
            <AddIcon />
          </IconButton>
          <IconButton color="secondary">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ textAlign: "center" }}>
          <CardContent>
            <Typography fontSize="1.25rem" mb="10px" color="primary">
              Total Tables
            </Typography>
            <Typography fontSize="1.5rem">
              {projectData.tables.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ textAlign: "center" }}>
          <CardContent>
            <Typography
              fontSize="1.25rem"
              mb="10px"
              component="h1"
              color="primary"
            >
              Total Data
            </Typography>
            <Typography fontSize="1.5rem">{totalData()}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Forms
          projectId={projectId}
          setProjectId={setProjectId}
          projectData={projectData}
          reloadData={reloadData}
        />
      </Grid>
    </Grid>
  );
};
