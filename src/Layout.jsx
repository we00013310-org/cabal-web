import React from "react";
import ScrollToTop from "./components/Helpers/ScrollToTop";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <ScrollToTop>
      <Outlet />
    </ScrollToTop>
  );
}

export default Layout;
