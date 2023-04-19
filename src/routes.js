import React from "react";
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

// Pages
//const Supplier = React.lazy(() => import("./pages/suppiler/Suppiler"));
const Promoters = React.lazy(()=> import("./pages/promoters/Promoters"));
const TeamLeader = React.lazy(() => import("./pages/team-leader/TeamLeader"));
const Events = React.lazy(() => import("./pages/events/Events"));
const OrderDetails = React.lazy(() =>
  import("./pages/order-details/OrderDetails")
);

// user master
const UserMaster = React.lazy(() => import("./pages/user-master-demo/UserMaster"));
const AddUser = React.lazy(() => import("pages/UserMaster/AddUser"));
const Rights = React.lazy(() => import("pages/UserMaster/Rights"));

// brand master
const BrandMaster = React.lazy(() => import("pages/BrandMaster/BrandMaster"));

//Word Document

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },

  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/promoters",
    name: "Promoter",
    icon: "ni ni-bullet-list-67 text-red",
    component: Promoters,
    layout: "/admin",
  },
  {
    path: "/team-leader",
    name: "Team Leader",
    icon: "ni ni-bullet-list-67 text-red",
    component: TeamLeader,
    layout: "/admin",
  },
  {
    path: "/events",
    name: "Event",
    icon: "ni ni-bullet-list-67 text-red",
    component: Events,
    layout: "/admin",
  },
  {
    path: "/order-details",
    name: "OrderDetails",
    icon: "ni ni-bullet-list-67 text-red",
    component: OrderDetails,
    layout: "/admin",
  },

  {
    path: "/add-user",
    name: "Add User",
    icon: "ni ni-bullet-list-67 text-red",
    component: AddUser,
    layout: "/admin",
  },
  {
    path: "/rights",
    name: "Rights",
    icon: "ni ni-bullet-list-67 text-red",
    component: Rights,
    layout: "/admin",
  },
  {
    path: "/user-master",
    name: "User Master",
    icon: "ni ni-bullet-list-67 text-red",
    component: UserMaster,
    layout: "/admin",
  },
  {
    path: "/brand-master",
    name: "Brand Master",
    icon: "ni ni-bullet-list-67 text-red",
    component: BrandMaster,
    layout: "/admin",
  },
];
export default routes;
