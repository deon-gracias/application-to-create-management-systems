import PropTypes from "prop-types";
import { AppBar, Box, Hidden, IconButton, Toolbar } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons/";

const Navbar = ({ onMobileNavOpen, ...rest }) => (
  <AppBar elevation={0} {...rest}>
    <Toolbar>
      <Box sx={{ flexGrow: 1 }} />
      <Hidden lgUp>
        <IconButton color="inherit" onClick={onMobileNavOpen}>
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  </AppBar>
);

Navbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default Navbar;
