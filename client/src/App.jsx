import React from "react";

// import Routes from "./router/Router.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login.jsx";
import PersistLogin from "./features/auth/PersistLogin.jsx";
import Prefetch from "./features/auth/Prefetch.jsx";
import UsersList from "./features/users/UsersList.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateJob from "./features/jobs/CreateJob.jsx";
import JobListings from "./features/jobs/JobListings.jsx";
// import JobListings from "./pages/JobListings.jsx";
import RolesPermissions from "./features/permissions/RolesPermissions.jsx";
import AllJobsReports from "./pages/reports/AllJobsReports.jsx";
import AllUsers from "./features/users/EditUser.jsx";
import Layout from "./components/Layout.jsx";
import AuthAccess from "./features/auth/AuthAccess.jsx";
import { rolesList } from "./config/rolesList.js";
import ViewJob from "./features/jobs/ViewJob.jsx";
import AuthorReporting from "./pages/reports/AuthorReporting.jsx";
import JobStagnation from "./pages/reports/JobStagnation.jsx";
import CreateJobs from "./features/jobs/CreateJobs.jsx";
import UserSettings from "./features/users/UserSettings.jsx";
import EditUser from "./features/users/EditUser.jsx";
import Chats from "./features/chats/Chats.jsx";
import AuthorJobSubmissionReport from "./pages/reports/AuthorJobSubmissionReport.jsx";
import JobPublished from "./pages/reports/JobPublished.jsx";

function App() {
  return (
    <>
      <ToastContainer position="top-right" theme="light" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route element={<PersistLogin />}>
            <Route
              element={
                <AuthAccess allowedRoles={[...Object.values(rolesList)]} />
              }
            >
              <Route element={<Prefetch />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="view-job/:id" element={<ViewJob />} />
                {/* <Route path="job-list" element={<JobList />} /> */}
                <Route path="job-listing" element={<JobListings />} />

                <Route path="create-job" element={<CreateJobs />} />
                <Route path="user-settings" element={<UserSettings />} />
                <Route path="chats" element={<Chats />} />

                <Route
                  element={
                    <AuthAccess
                      allowedRoles={[rolesList.admin, rolesList.subAdmin]}
                    />
                  }
                >
                  <Route path="users-list" element={<UsersList />} />
                  <Route path="edit-user/:id" element={<EditUser />} />
                  <Route
                    path="role-permissions/:id"
                    element={<RolesPermissions />}
                  />

                  <Route path="job-stagnation" element={<JobStagnation />} />
                  <Route path="all-jobs" element={<AllJobsReports />} />
                  <Route
                    path="author-reporting"
                    element={<AuthorReporting />}
                  />
                  <Route
                    path="jobs-submission"
                    element={<AuthorJobSubmissionReport />}
                  />
                  <Route path="job-published" element={<JobPublished />} />
                </Route>

                {/* <Route path=":id" element={<EditUser />} /> */}
                {/* <Route path="new" element={<NewUserForm />} /> */}
              </Route>

              {/* End Dash */}
            </Route>
          </Route>

          {/* End Protected Routes */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
