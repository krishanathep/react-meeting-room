import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
import { Modal, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import axios from "axios";

const PAGE_SIZE = 5;

const blogs = () => {
  //create popup
  const [createShow, setCreateShow] = useState(false);
  const CreateClose = () => setCreateShow(false);

  //edit popup
  const [editShow, setEditShow] = useState(false);
  const EditClose = () => setEditShow(false);

  //view popup
  const [viewShow, setViewShow] = useState(false);
  const ViewClose = () => setViewShow(false);

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState(blogs.slice(0, PAGE_SIZE));
  
  const { register, handleSubmit,  formState: { errors } } = useForm();
  
  //blogs state
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [validated, setValidated] = useState(false);

  const getData = async () => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    await axios
      .get("https://express-mongodb-api-server.onrender.com/api/blogs")
      .then((res) => {
        setBlogs(res.data);
        setRecords(res.data.slice(from, to));
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [page]);

  const hanldeDelete = (blogs) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      axios.delete('https://express-mongodb-api-server.onrender.com/api/blogs/'+ blogs._id)
        .then((res)=>{
          console.log(res)
          getData()
        })
      }
    })
  };

  const handleViewShow = (blogs) => {
    setViewShow(true)
    console.log(blogs._id)
  }

  const handleEditShow = (blogs) => {
    setEditShow(true)
    console.log(blogs._id)
  }

  const handleCreate = () => {
    setCreateShow(true)
  }

  const handleCreateSubmit = async data => {
    await axios.post('https://express-mongodb-api-server.onrender.com/api/blogs', data)
      .then((res)=>{
        console.log(res.data)
        getData()
        setCreateShow(false)
      })
      .catch((error)=>{console.log(error)})
  } 

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Blogs post</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Blogs</li>
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
                    <button
                      className="btn btn-success mb-3"
                      onClick={handleCreate}
                    >
                      <i className="fa fa-plus"></i>{' '}Create blog
                    </button>

                    <DataTable
                      withBorder
                      striped
                      verticalSpacing="md"
                      paginationSize="md"
                      withColumnBorders
                      fetching={loading}
                      idAccessor="_id"
                      columns={[
                        { accessor: "title" },
                        { accessor: "content" },
                        { accessor: "author" },
                        { accessor: "createdAt" },
                        {
                          accessor: "actions",
                          title: "Actions",
                          width: 200,
                          render: (blogs) => (
                            <>
                              <Button 
                                variant="primary"  
                                onClick={()=>handleViewShow(blogs)}>
                                <i className="fa fa-eye"></i>
                              </Button>{" "}
                              <Button
                                variant="info"
                                onClick={()=>handleEditShow(blogs)}
                              >
                                <i className="fa fa-edit"></i>
                              </Button>{" "}
                              <Button
                                variant="danger"
                                onClick={()=>hanldeDelete(blogs)}
                              >
                                <i className="fa fa-trash"></i>
                              </Button>
                            </>
                          ),
                        },
                      ]}
                      records={records}
                      minHeight={150}
                      totalRecords={blogs.length}
                      recordsPerPage={PAGE_SIZE}
                      page={page}
                      onPageChange={(p) => setPage(p)}
                    />
                    {/* Create Blog Madal */}
                    <Modal centered show={createShow}>
                      <Modal.Header>
                        <Modal.Title>Create blog</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Row>
                            <Form.Group as={Col} md="12">
                              <Form.Label>Title</Form.Label>
                              <Form.Control
                                {...register("title", { required: true })}
                              />
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>Content</Form.Label>
                              <Form.Control
                              {...register("content", { required: true })}
                              />
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>Author</Form.Label>
                              <Form.Control
                              {...register("author", { required: true })}
                              />
                            </Form.Group>
                          </Row>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={handleSubmit(handleCreateSubmit)}>
                          Save Changes
                        </Button>
                        <Button variant="secondary" onClick={CreateClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>

                     {/* Edit Blog Madal */}
                     <Modal centered show={editShow}>
                      <Modal.Header>
                        <Modal.Title>Edit blog</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Woohoo, you are reading this text in a modal!
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={EditClose}>
                          Save Changes
                        </Button>
                        <Button variant="secondary" onClick={EditClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {/* View Blog Madal */}
                    <Modal centered show={viewShow}>
                      <Modal.Header>
                        <Modal.Title>View blog</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Woohoo, you are reading this text in a modal! { blogs._id }
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={ViewClose}>
                          Save Changes
                        </Button>
                        <Button variant="secondary" onClick={ViewClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>

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

export default blogs;
