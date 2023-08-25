import React, { useState, useEffect, PureComponent } from "react";
import axios from "axios";

export default function Home() {
  const [restuarent, setRestuarent] = useState(0);
  const [blogs, setBlogs] = useState(0);
  const [bookings, setBookings] = useState(0);

  const getAll = async () => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    await axios
      .get(
        "https://full-stack-app.com/laravel_restaurant_api/public/api/restaurants"
      )
      .then((res) => {
        setRestuarent(res.data.restaurants.length);
      });

    await axios.get("https://full-stack-app.com/laravel_auth_jwt_api/public/api/events").then((res) => {
      setBookings(res.data.events.length);
    });

    await axios.get("https://full-stack-app.com/laravel_auth_jwt_api/public/api/blogs").then((res) => {
      setBlogs(res.data.blogs.length);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <li className="breadcrumb-item active">Dashboard</li>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{restuarent}</h3>
                  <p>New Restaurants</p>
                </div>
                <div className="icon">
                  <i className="fas fa-utensils"></i>
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{bookings}</h3>
                  <p>New Bookings</p>
                </div>
                <div className="icon">
                  <i className="fas fa-calendar" />
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{blogs}</h3>
                  <p>New Post</p>
                </div>
                <div className="icon">
                  <i className="far fa-comment-dots"></i>
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-primary">
                <div className="inner">
                  <h3>200</h3>
                  <p>All Users</p>
                </div>
                <div className="icon">
                  <i className="fas fa-users" />
                </div>
                <a href="#" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
