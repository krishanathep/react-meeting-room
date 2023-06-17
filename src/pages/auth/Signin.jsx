import React from "react";
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'

export default function Signin() {
  const { register, handleSubmit,  formState: { errors } } = useForm();

  const onSubmit = data => console.log(JSON.stringify(data));

  return (
    <>
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="#">
              <b>Admin</b>LTE
            </a>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>
              <form onSubmit={handleSubmit(onSubmit)}>
              {errors.name && <span className="text-danger">This username field is required</span>}
                <div className="input-group mb-3">
                <input className="form-control" type="email" {...register("name", { required: true })} />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                {errors.password && <span className="text-danger">This password field is required</span>}
                <div className="input-group mb-3">
                <input className="form-control" type="password" {...register("password", { required: true })} />
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
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
              <p className="mb-0 mt-2">
                <Link to={'/signup'} className="text-center">
                  Register a new membership
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

