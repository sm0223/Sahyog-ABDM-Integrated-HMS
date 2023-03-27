import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";

const HomeDashboard = () => {
  return (
      <Router>
        <div>
          <Link to="/">Admin Login</Link>
          <Link to="/notes">Practitioner Login</Link>
          <Link to="/users">Staff Login</Link>
        </div>

        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/practitioner" element={<PractitionerLogin />} />
          <Route path="/staff" element={<StaffLogin />} />
        </Routes>
      </Router>
  );
};

export default HomeDashboard;
