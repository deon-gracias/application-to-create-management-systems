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

export const Register = () => {
  const history = useHistory();

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
            password: Yup.string().max(255).required("password is required"),
          })}
          onSubmit={(values) => {
            auth
              .createUserWithEmailAndPassword(values.email, values.password)
              .then(() => {
                history.push("/dashboard");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Create new account
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Use your email to create new account
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
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign up now
                </Button>
              </Box>
              <Typography color="textSecondary" variant="body1">
                Have an account?
                <Link component={RouterLink} to="/login">
                  Sign in
                </Link>
              </Typography>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};
