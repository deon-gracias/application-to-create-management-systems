import { useEffect } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { auth } from "../helper/firebase";

export const Login = ({ projectId }) => {
  const history = useHistory();

  useEffect(() => {
    if (projectId !== "") {
      history.push("/project");
    }
  });

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          onSubmit={(values) => {
            auth
              .signInWithEmailAndPassword(values.email, values.password)
              .then((res) => {
                history.push("/project");
              })
              .catch((err) => {
                console.log(err);
                alert("Invalid Email or  Password");
              });
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
              <Box sx={{ mb: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Sign in
                </Typography>
              </Box>
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                </Button>
              </Box>
              <Typography color="textSecondary" variant="body1">
                Don&apos;t have an account?{" "}
                <Link component={RouterLink} to="/register">
                  Sign up
                </Link>
              </Typography>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};
