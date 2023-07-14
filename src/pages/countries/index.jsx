import React,{useState,useEffect} from 'react'
import { Row, Col, Button, Card } from "react-bootstrap";
import axios from 'axios';

const Countrises = () => {
  const [countries, setCountries] = useState([])

  const getData = async () => {
    await axios.get('https://restcountries.com/v3.1/all')
      .then((res)=>{
        console.log(res.data)
        setCountries(res.data)
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
                <h1 className="m-0">Countries list</h1>
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
                  {countries.map((countrie, index)=>{
                    return(
                    <Col lg={"3"} key={index}>
                      <Card>
                        <Card.Img src={countrie.flags.png} height={'180'} alt="Card image" />
                          <Card.Body>
                            <Card.Title>
                              Name : { countrie.name.common }
                            </Card.Title> 
                            <Card.Text>
                              Region : { countrie.region }
                            </Card.Text>
                            {/* <Card.Text>
                              Population : { countrie.population }
                            </Card.Text> */}
                          </Card.Body>
                      </Card>
                    </Col>
                  )})}
                </Row>
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

export default Countrises