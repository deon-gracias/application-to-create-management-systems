import PropTypes from "prop-types";
import { AppBar, Box, IconButton, Toolbar } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons/";

const Navbar = ({ onMobileNavOpen, ...rest }) => (
  <AppBar elevation={0} {...rest}>
    <Toolbar>
      <Box />
      <IconButton color="inherit" onClick={onMobileNavOpen}>
        <MenuIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

Navbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default Navbar;
