import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const PAGE_SIZE = 5;

const blogs = () => {
  //create popup
  const [createShow, setCreateShow] = useState(false);
  const handleCreateClose = () => setCreateShow(false);
  const handleCreateShow = () => setCreateShow(true);

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
    alert("Hello delete!!! "+blogs._id);
  };

  const handleViewShow = (blogs) => {
    setViewShow(true)
    console.log(blogs._id)
  }

  const handleEditShow = (blogs) => {
    setEditShow(true)
    console.log(blogs._id)
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
                      onClick={handleCreateShow}
                    >
                      <i className="fa fa-plus"></i>{' '}Create blog
                    </button>

                    <DataTable
                      withBorder
                      highlightOnHover
                      verticalSpacing="md"
                      paginationSize="md"
                      withColumnBorders
                      fetching={loading}
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
                    <Modal centered show={createShow} onHide={handleCreateClose}>
                      <Modal.Header>
                        <Modal.Title>Create blog</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Woohoo, you are reading this text in a modal!
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={handleCreateClose}>
                          Save Changes
                        </Button>
                        <Button variant="secondary" onClick={handleCreateClose}>
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
