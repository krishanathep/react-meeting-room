import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
import { Row, Col, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)

  const getData = async () => {
    await axios.get('https://fakestoreapi.com/products')
      .then((res)=>{
        setProducts(res.data)
        setCount(res.data.length)
        console.log(res.data)
        console.log(res.data.length)
      })
  }

  useEffect(()=>{
    getData()
  },[])

  return (
  <>
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Products list</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">List</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card card-primary">
                <h4 className="card-header">
                  Products list
                </h4>
                <div className="card-body">
                 <p>Total Products = {count}</p>
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

export default Products