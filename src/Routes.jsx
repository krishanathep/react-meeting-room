import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import WithNavbar from "./layouts/WithNavbar";
import WithOutnavbar from "./layouts/WithOutnavbar";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Home from "./pages/home";
import Meeting from "./pages/meeting";
import Blogs from "./pages/blogs";
import Restaurant from "./pages/restaurant";

const RoutesPage = () => {
  return (
    <Router>
      <Routes>
        <Route element={<WithOutnavbar />}>
          <Route exact  path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>
        <Route
          element={
            <RequireAuth loginPath={"/auth/signin"}>
              <WithNavbar />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/meetings/" element={<Meeting />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/restaurant" element={<Restaurant/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesPage;
