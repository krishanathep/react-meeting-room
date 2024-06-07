import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

const todo = () => {
  const [todos, setTodos] = useState([]);

  const getData = async () => {
    await axios
      .get("https://full-stack-app.com/laravel_auth_jwt_api/public/api/blogs")
      .then((res) => {
        setTodos(res.data.blogs);
        //console.log(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Todo list</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Todo list</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <h5 className="card-header">Todo list</h5>
                  <div className="card-body">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Contetnt</th>
                          <th>Author</th>
                          {/* <th>Image</th> */}
                          {/* <th>Created</th> */}
                          {/* <th>Updated</th> */}
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {todos.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td>{index+1}</td>
                              <td>{item.title}</td>
                              <td>{item.content}</td>
                              <td>{item.author}</td>
                              {/* <td>{item.image}</td> */}
                              {/* <td>{item.created_at}</td> */}
                              {/* <td>{item.updated_at}</td> */}
                              <td>
                                <Link to={"/todo/detail/"+item.id} className="btn btn-primary">View</Link>{' '}
                                <button className="btn btn-info">Edit</button>{' '}
                                <button className="btn btn-danger">Delete</button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default todo;
