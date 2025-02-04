import { Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { Toaster } from "react-hot-toast";
import { UserContextProvide } from "../context/userContext";
import Dashboard from "./pages/Dashboard";
import Maintenance from "./pages/Maintenance";
import Reports from "./pages/Reports";
import Transactions from "./pages/Transactions";
import ViewBooks from "./pages/ViewBooks";
import MyBooks from "./pages/MyBooks";
import { useState } from "react";
import axios from "axios";  // Make sure axios is imported
import RequestBook from "./pages/RequestBook";
import IssueBook from "./pages/IssueBook";
import Membership from "./pages/Membership";

axios.defaults.baseURL = "http://localhost:2000";
axios.defaults.withCredentials = true;

function App() {
  const [myBooks, setMyBooks] = useState([]); // Declare myBooks state

  const addToMyBooks = (book) => {
    setMyBooks((prevBooks) => [...prevBooks, book]); // Add book to the list
  };

  return (
    <>
      <UserContextProvide>
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          {/* Define the root route for authentication */}
          <Route path="/" element={<Authentication />} />

          {/* Define the dashboard route with nested routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            {/* Define the nested routes for different sections of the dashboard */}
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="reports" element={<Reports />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="membership" element={<Membership />} />
            {/* Define the nested routes for books */}
            <Route path="view-books" element={<ViewBooks addToMyBooks={addToMyBooks} />} />
            <Route path="my-books" element={<MyBooks myBooks={myBooks} />} />
            <Route path="issue-book" element={<IssueBook/>} />
            <Route path="request-book" element={<RequestBook />} />
          </Route>
        </Routes>
      </UserContextProvide>
    </>
  );
}

export default App;
