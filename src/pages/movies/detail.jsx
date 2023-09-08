import React from 'react'

const Detail = () => {
  return (
    <>
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Movies detail</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Movies</a>
                </li>
                <li className="breadcrumb-item active">Detail</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-6">
            <div className="card">
                  <img
                    className="card-img-top"
                    src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+'/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg'}
                    height={'500'}
                    thumbnail
                    alt="Card image"
                  />
                  <div className="card-body">
                    <h4 className="card-title">title</h4>
                    <p className="card-text text-muted">
                      body
                    </p>
                  </div>
                </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Detail