import React from "react";
import { useForm } from "react-hook-form"
import { useSignIn } from 'react-auth-kit'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signin() {
  const navigate = useNavigate()
  const signIn = useSignIn()
  const { register, handleSubmit,  formState: { errors } } = useForm();

  const onSubmit = async data => {
    try {
      await axios.post('http://full-stack-app.com/laravel_auth_jwt/public/api/login', data)
        .then((res)=>{

          const token = res.data.access_token

          if(token != null) {
            if(signIn({
              token: res.data.access_token,
              expiresIn: res.data.expires_in,
              authState: res.data.user,
              tokenType: "Bearer",
            })){
              navigate('/')
            }
          } else {
            console.log('เกิดข้อผิดพลาด!!!')
          }
        })
    } catch(error){
      console.log(error)
    }
  }

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
              {errors.email && <span className="text-danger">This username field is required</span>}
                <div className="input-group mb-3">
                <input className="form-control" type="email" {...register("email", { required: true })} />
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
                <Link to={'/auth/signup'} className="text-center">
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

