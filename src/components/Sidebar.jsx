import React from "react";
import { NavLink as Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <>
      <aside className="main-sidebar nav-pills sidebar-dark-primary sidebar-no-expand elevation-1">
        <Link to="/" className="brand-link">
          <img
            src="/src/assets/dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-1"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </Link>
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-home"></i>
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/meetings" className="nav-link">
                  <i className="nav-icon fas fa-calendar"></i>
                  <p>Meetings</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blogs" className="nav-link">
                  <i className="nav-icon fas fa-file"></i>
                  <p>Blogs post</p>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/about" className="nav-link">
                <i className="nav-icon fas fa-address-card"></i>
                  <p>About</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                  <p>Users</p>
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

