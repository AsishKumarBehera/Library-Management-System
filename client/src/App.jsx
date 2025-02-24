import { Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { Toaster } from "react-hot-toast";
import { UserContextProvide } from "../context/userContext";
import Dashboard from "./pages/Dashboard";
import Maintenance from "./pages/Maintenance";
import ViewBooks from "./pages/ViewBooks";
import MyBooks from "./pages/MyBooks";
import RequestBook from "./pages/RequestBook";
import Membership from "./pages/Membership";
import IssueBook from "./pages/IssueBook";
import ManageBooks from "./pages/AdminDashboard/ManageBooks";
import Profile from "./pages/Profile"
import ManageUsers from "./pages/AdminDashboard/ManageUsers";
import Transactions from "./pages/AdminDashboard/Transactions"
import GenerateReports from "./pages/AdminDashboard/GenerateReports";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:2000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvide>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        {/* Authentication Page */}
        <Route path="/" element={<Authentication />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="view-books" element={<ViewBooks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="membership" element={<Membership />} />
        <Route path="issue-books" element={<IssueBook />} />

        {/* Dashboard (Parent Route) */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="manage-book" element={<ManageBooks />} /> 
          <Route path="manage-user" element={
            <ManageUsers />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="generate-report" element={<GenerateReports />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="request-book" element={<RequestBook />} />
        </Route>
      </Routes>
    </UserContextProvide>
  );
}

export default App;
