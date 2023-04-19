import React from "react";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import routes from "routes.js";

export const NavbarLayout = ({ children, ...props }) => {
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <div>
      <AdminNavbar
        {...props}
        brandText={getBrandText(props.location.pathname)}
      />
      <div>{children}</div>
    </div>
  );
};
