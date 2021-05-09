import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const NavbarLayout = ({ setProjectId }) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <Navbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <Sidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        setProjectId={setProjectId}
      />
    </>
  );
};

export default NavbarLayout;
