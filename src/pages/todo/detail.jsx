import React, { useState,useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import axios from 'axios'

const detail = () => {

    const { id } = useParams();

    const[todo,setTodo]=useState({})

    const getData = async () => {
        await axios
          .get("https://full-stack-app.com/laravel_auth_jwt_api/public/api/blog/"+id)
          .then((res) => {
            setTodo(res.data.blog);
            console.log(res.data.blog)
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
              <h1 className="m-0">Todo</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Todo</li>
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
              <div className="card-body">
              <h5>{todo.title}</h5>
              <h5>{todo.content}</h5>
              <h5>{todo.author}</h5>
              <div className='float-right'>
              <Link className='btn btn-primary' to={"/todo"}>Go back</Link>
              </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default detail