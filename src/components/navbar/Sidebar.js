import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Drawer, Hidden, List } from "@material-ui/core";
import {
  Dashboard as DashboardIcon,
  GridOn as TableIcon,
  Description as FormIcon,
  Logout as LogOutIcon,
  ArrowBack as BackIcon,
} from "@material-ui/icons";
import NavItem from "./NavItem";
import { auth } from "../../helper/firebase";

const items = [
  {
    href: "/dashboard",
    icon: DashboardIcon,
    title: "Dashboard",
  },
  {
    href: "/tables",
    icon: TableIcon,
    title: "Tables",
  },
  {
    href: "/forms",
    icon: FormIcon,
    title: "Forms",
  },
];

const Sidebar = ({ onMobileClose, openMobile, setProjectId }) => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <NavItem href="/project" title="Back To Projects" icon={BackIcon} />
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

Sidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

Sidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default Sidebar;
