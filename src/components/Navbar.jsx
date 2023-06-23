import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignOut,useAuthUser } from 'react-auth-kit'

export default function Navbar() {
  const navigate = useNavigate()
  const userDatail = useAuthUser()
  const signOut = useSignOut()

  const handleSignOut = () => {
    signOut()
    navigate('/auth/signin')
  }

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
           Hello : {userDatail().name}{' '}<i className="fas fa-user-circle fa-lg"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
            <a href="#" className="dropdown-item" onClick={handleSignOut}>
              <i className="fas fa-sign-out-alt mr-2"></i> Sign out
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

