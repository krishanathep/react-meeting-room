import React from 'react'
import { Link } from 'react-router-dom'

export default function view() {
    return (
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Meeting view</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Meeting view</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h2>Title</h2>
                      <p>Start</p>
                      <p>End</p>
                      <Link to='/meetings' className='btn btn-danger float-right' >Cancel</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
