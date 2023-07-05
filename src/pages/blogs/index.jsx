import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
import { Modal, Button, Col, Form, Row, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import axios from "axios";

const PAGE_SIZE = 10;

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

  //id for edit
  const [editid, setEditId] = useState("");

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState(blogs.slice(0, PAGE_SIZE));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //blogs state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [created, setCreated] = useState("");

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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Your blog has been deleted',
          showConfirmButton: false,
          timer: 2000
        });
        axios
          .delete(
            "https://express-mongodb-api-server.onrender.com/api/blogs/" +
              blogs._id
          )
          .then((res) => {
            console.log(res);
            getData();
          });
      }
    });
  };

  const handleViewShow = async (blogs) => {
    setViewShow(true);

    await axios
      .get(
        "https://express-mongodb-api-server.onrender.com/api/blogs/" + blogs._id
      )
      .then((res) => {
        console.log(res);
        setTitle(res.data.title);
        setContent(res.data.content);
        setAuthor(res.data.author);
        setCreated(res.data.createdAt)
      });
  };

  const handleEditShow = async (blogs) => {
    setEditShow(true);
    await axios
      .get(
        "https://express-mongodb-api-server.onrender.com/api/blogs/" + blogs._id
      )
      .then((res) => {
        setEditId(res.data._id);
        console.log(res);
        reset({
          title: res.data.title,
          content: res.data.content,
          author: res.data.author,
        });
      });
  };

  const handleEditSubmit = async (data) => {
    await axios
      .put(
        "https://express-mongodb-api-server.onrender.com/api/blogs/" + editid,
        data
      )
      .then((res) => {
        console.log(res.data);
        getData();
        setEditShow(false);
        Swal.fire({
          icon: 'success',
          title: 'Your blog has been edited',
          showConfirmButton: false,
          timer: 2000
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCreateShow = () => {
    setCreateShow(true);
  };

  const handleCreateSubmit = async (data) => {
    await axios
      .post("https://express-mongodb-api-server.onrender.com/api/blogs", data)
      .then((res) => {
        console.log(res.data);
        getData();
        reset({
          title: "",
          content: "",
          author: "",
        });
        setCreateShow(false);
        Swal.fire({
          icon: 'success',
          title: 'Your blog has been created',
          showConfirmButton: false,
          timer: 2000
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                      onClick={handleCreateShow}
                    >
                      <i className="fa fa-plus"></i> Create blog
                    </button>

                    <DataTable
                      withBorder
                      striped
                      fontSize={"md"}
                      verticalSpacing="md"
                      paginationSize="md"
                      withColumnBorders
                      fetching={loading}
                      idAccessor="_id"
                      columns={[
                        { accessor: 'file',
                          render: ({file}) => (
                            <>
                              <Image src={'https://express-mongodb-api-server.onrender.com/images/'+file} width={'150'} thumbnail />
                            </>
                          ),
                        },
                        { accessor: "title" },
                        { accessor: "content" },
                        { accessor: "author" },
                        {
                          accessor: "createdAt",
                          render: ({ createdAt }) =>
                            dayjs(createdAt).format("DD-MMMM- YYYY"),
                        },
                        {
                          accessor: "actions",
                          title: "Actions",
                          width: 200,
                          render: (blogs) => (
                            <>
                              <Button
                                variant="primary"
                                onClick={() => handleViewShow(blogs)}
                              >
                                <i className="fa fa-eye"></i>
                              </Button>{" "}
                              <Button
                                variant="info"
                                onClick={() => handleEditShow(blogs)}
                              >
                                <i className="fa fa-edit"></i>
                              </Button>{" "}
                              <Button
                                variant="danger"
                                onClick={() => hanldeDelete(blogs)}
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
                              {errors.title && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>Content</Form.Label>
                              <Form.Control
                                {...register("content", { required: true })}
                              />
                              {errors.content && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>Author</Form.Label>
                              <Form.Control
                                {...register("author", { required: true })}
                              />
                              {errors.author && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                          </Row>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={handleSubmit(handleCreateSubmit)}
                        >
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
                        <Form>
                          <Row>
                            <Form.Group as={Col} md="12">
                              <Form.Label>Title</Form.Label>
                              <Form.Control
                                {...register("title", { required: true })}
                              />
                              {errors.title && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>Content</Form.Label>
                              <Form.Control
                                {...register("content", { required: true })}
                              />
                              {errors.content && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>Author</Form.Label>
                              <Form.Control
                                {...register("author", { required: true })}
                              />
                              {errors.author && (
                                <span className="text-danger">
                                  This field is required
                                </span>
                              )}
                            </Form.Group>
                          </Row>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={handleSubmit(handleEditSubmit)}
                        >
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
                        <Form.Group>
                          <Form.Label>Title</Form.Label> : {title}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Content</Form.Label> : {content}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Author</Form.Label> : {author}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Created</Form.Label> : { dayjs(created).format("DD-MMMM- YYYY") }
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
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
