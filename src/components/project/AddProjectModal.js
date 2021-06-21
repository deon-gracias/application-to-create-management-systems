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
import { Formik } from "formik";
import * as Yup from "yup";

import { auth } from "../../helper/firebase";

export default function AddProjectModal({
  addProjectOpen,
  setAddProjectOpen,
  addNewProject,
  reloadData,
}) {
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
              reloadData();
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
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
}
