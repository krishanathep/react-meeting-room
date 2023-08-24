import React, { useState, useEffect } from "react";
import ResMap from "../../components/ResMap";
import axios from "axios";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [rest, setRest] = useState("");
  const [dataFilter] = useState(["title", "category"]);

  // url barck-end api
  const APP_API =
    "https://full-stack-app.com/laravel_restaurant_api/public/api/restaurants";

  // Get restaurant api from url
  const fetchData = async () => {
    await axios.get(APP_API).then((res) => {
      console.log(res.data);
      setRestaurants(res.data.restaurants);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchRestaurant =(restaurants)=>{
    return restaurants.filter((item)=>{
      return dataFilter.some((filter)=>{
       return item[filter].indexOf(rest)>-1
      })
    })
  }

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Restaurant easy</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Restaurant</li>
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
                    <ResMap />
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <input
                      className="form-control"
                      type="text"
                      name="search"
                        value={rest}
                        onChange={(e)=>setRest(e.target.value)}
                      placeholder="Search..."
                    />
                  </div>
                </div>
                <div className="row">
                  {searchRestaurant(restaurants).map((item) => (
                    <div className="col-md-3" key={item.id}>
                      <div className="card">
                        <img
                          className="card-img-top"
                          src={item.image}
                          alt="Card image"
                        />
                        <div className="card-body">
                          <h4 className="card-title">{item.title}</h4>
                          <p className="card-text text-muted">{item.description.substring(0, 70)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurant;
