import { Box, Container } from "@material-ui/core";
import NavbarLayout from "./navbar/NavbarLayout";

export const Layout = ({ setProjectId, children }) => (
  <Box mt="75px">
    <NavbarLayout setProjectId={setProjectId} />
    <Container>{children}</Container>
  </Box>
);
