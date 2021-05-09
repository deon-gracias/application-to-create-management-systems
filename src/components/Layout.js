import { Box, Container } from "@material-ui/core";
import NavbarLayout from "./navbar/NavbarLayout";

export const Layout = ({ projectId, children }) => (
  <Box mt="75px">
    <NavbarLayout projectId={projectId} />
    <Container>{children}</Container>
  </Box>
);
