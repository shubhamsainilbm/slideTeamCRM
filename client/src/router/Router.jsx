import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CreateJob from "../pages/CreateJob";
import JobList from "../pages/JobList";
import JobListings from "../pages/JobListings";
import RolesPermissions from "../features/permissions/RolesPermissions";
import AuthorReporting from "../pages/reports/AuthorReporting";
import JobStagnation from "../pages/reports/JobStagnation";
import AllJobsReports from "../pages/reports/AllJobsReports";
import UsersList from "../features/users/UsersList";
import AllUsers from "../features/users/EditUser";
import Login from "../features/auth/Login";

export default function AppRoutes() {
  const routes = [
    {
      name: "Dashboard",
      path: "/",
      Component: Dashboard,
    },

    {
      name: "CreateJob",
      path: "/create-job",
      Component: CreateJob,
    },
    {
      name: "JobList",
      path: "/job-list",
      Component: JobList,
    },
    {
      name: "JobListings",
      path: "/job-listing",
      Component: JobListings,
    },
    {
      name: "RolesPermissions",
      path: "/role-permissions",
      Component: RolesPermissions,
    },
    {
      name: "AuthorReporting",
      path: "/author-reporting",
      Component: AuthorReporting,
    },
    {
      name: "JobStagnation",
      path: "/job-stagnation",
      Component: JobStagnation,
    },
    {
      name: "AllJobsReports",
      path: "/all-jobs",
      Component: AllJobsReports,
    },
    {
      name: "UsersList",
      path: "/users-list",
      Component: UsersList,
    },
    {
      name: "AllUsers",
      path: "/all-users",
      Component: AllUsers,
    },
    {
      name: "Login",
      path: "/login",
      Component: Login,
    },
  ];

  // ROUTES MAPING
  const Routing = routes.map(({ name, path, Component }, i) => (
    <Route key={i} path={path} element={<Component />} />
  ));

  return (
    <div>
      <Routes>{Routing}</Routes>
    </div>
  );
}
