import React from "react";
import { NavLink as Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <aside className="main-sidebar nav-pills sidebar-dark-primary sidebar-no-expand elevation-1">
        <Link to="/" className="brand-link">
          <img
            src="/assets/dist/img/AdminLTELogo.png"
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
              <li className="nav-header">MAIN MENU</li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
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
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  <i className="nav-icon fas fa-shopping-cart"></i>
                  <p>Products</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/countries" className="nav-link">
                <i className="nav-icon fas fa-globe-americas"></i>
                  <p>Countries</p>
                </Link>
              </li>
              <li className="nav-header">TEST MENU</li>
              <li className="nav-item">
                <Link to="/test" className="nav-link">
                  <i className="nav-icon fas fa-vial"></i>
                  <p>Test redux</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
