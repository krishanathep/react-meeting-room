import React from 'react'
import { Link } from 'react-router-dom'

export default function create() {
  return (
    <div className="content-wrapper">
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Meeting create</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Meeting create</li>
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
                <form action="">
                    <div className="form-group">
                        <label htmlFor="start">Start date</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="start">End date</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="start">Meeting name</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="start">Meeting detail</label>
                        <textarea className='form-control' name="" id="" cols="30" rows="3"></textarea>
                    </div>
                    <Link to='/meetings' className='btn btn-danger float-right ml-1' >Cancel</Link>
                    <input type="submit" className='btn btn-primary float-right' value={'Submit'} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
