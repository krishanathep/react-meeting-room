import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
import { Button } from "@mantine/core";
import axios from "axios";

const PAGE_SIZE = 10;

const blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading,setLoading] = useState(true)
  const [records, setRecords] = useState(blogs.slice(0, PAGE_SIZE));

  const getData = async () => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    await axios
      .get("https://express-mongodb-api-server.onrender.com/api/blogs")
      .then((res) => {
        setBlogs(res.data);
        setRecords(res.data.slice(from, to));
        setLoading(false)
      });
  };

  useEffect(() => {
    getData();
  }, [page]);

  const viewSubmit =()=>{
    alert('Hello view!!!')
  }

  const editSubmit =()=>{
    alert('Hello edit!!!')
  }

  const deleteSubmit =()=>{
    alert('Hello delete!!!')
  }

  return (
    <>
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Meetings</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Mettings</li>
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
                      width: 180,
                      render: () => (
                        <>
                          <Button onClick={viewSubmit} size="xs"><i className="fa fa-eye"></i></Button>{" "} 
                          <Button onClick={editSubmit} size="xs" color="green"><i className="fa fa-edit"></i></Button>{" "} 
                          <Button onClick={deleteSubmit} size="xs" color="red"><i className="fa fa-trash"></i></Button>
                        </>
                      ),
                    }
                  ]}
                  records={records}
                  minHeight={150}
                  totalRecords={blogs.length}
                  recordsPerPage={PAGE_SIZE}
                  page={page}
                  onPageChange={(p) => setPage(p)}
                />
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
