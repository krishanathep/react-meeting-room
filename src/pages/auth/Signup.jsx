import React from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
  const navigate = useNavigate()
  const { register, handleSubmit,  formState: { errors } } = useForm();

  const REACT_APP_API = 'https://express-mongodb-api-server.onrender.com/api/auth/login'

  const onSubmit = async data => {
    await axios.post(REACT_APP_API, data)
      .then((res)=>{
        console.log(res)
        navigate('/auth/signin')
      })
  }

  return (
    <div className="hold-transition register-page">
    <div className="register-box">
      <div className="register-logo">
        <a href="#">
          <b>Admin</b>LTE
        </a>
      </div>
      <div className="card">
        <div className="card-body register-card-body">
          <p className="login-box-msg">Register a new membership</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
            <input className="form-control" type="text" {...register("name", { required: true })} />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
            <input className="form-control" type="email" {...register("name", { required: true })} />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
            <input className="form-control" type="password" {...register("password", { required: true })} />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
            <input className="form-control" type="password" {...register("password_confirmation", { required: true })} />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </div>
            </div>
          </form>
          <div className="mt-2">
          <Link to={'/auth/signin'} className="text-center">
            I already have a membership
          </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

