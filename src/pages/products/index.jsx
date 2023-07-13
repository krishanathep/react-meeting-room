import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
import { Row, Col, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    await axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
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
                <div className="card card-outline card-primary">
                <div className="card-body">
                <Row>
                  {products.map((product)=>{
                    return(
                    <Col lg={"2"}>
                      <Card>
                        <Card.Img src={product.image} height={'220'} alt="Card image" />
                          <Card.Body>
                            <Card.Title>
                              {product.title.substring(0, 15)}
                            </Card.Title> <Card.Text></Card.Text>
                            <Button variant="primary" size="lg">ADD TO CART</Button>
                          </Card.Body>
                      </Card>
                    </Col>
                    )
                  })}
                </Row>
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

export default Products;
