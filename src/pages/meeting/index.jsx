import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2'
import moment from "moment";
import dayjs from "dayjs";


export default function meeting() {
  const localizer = momentLocalizer(moment);
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [start,setStart] = useState('')
  const [end,setEnd] = useState('')
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [user, setUser] = useState('')

  //create popup
  const [createShow, setCreateShow] = useState(false);
  const CreateClose = () => setCreateShow(false);
  //view popup
  const [viewShow, setViewShow] = useState(false);
  const ViewClose = () => setViewShow(false);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm();

  const getData = async () => {
    try {
      await axios
      .get("https://express-mongodb-api-server.onrender.com/api/events")
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);
      });
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const hanldeDelete = (event) => {
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
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        axios
          .delete(
            "https://express-mongodb-api-server.onrender.com/api/events/" +
              event._id
          )
          .then((res) => {
            console.log(res);
            setViewShow(false)
            getData();
          });
      }
    });
  };

  const handleSelectMeeting = async(event) => {
    setViewShow(true)
    await axios.get('https://express-mongodb-api-server.onrender.com/api/events/'+ event._id)
      .then((res)=>{
        console.log(res)
        setTitle(res.data.title)
        setDetail(res.data.detail)
        setUser(res.data.user)
        setStart(res.data.start)
        setEnd(res.data.end)
      })
  };

  const handleSelectEvent = ({ start, end }) => {
    setCreateShow(true);
    setStart(dayjs(start).format("YYYY-MM-DD"))
    setEnd(dayjs(end).format("YYYY-MM-DD"))
    resetField('start')
    resetField('end')
  };

  const handleCreateEvent = async (data) =>{
    await axios.post('https://express-mongodb-api-server.onrender.com/api/events', data)
      .then((res)=>{
        console.log(res)
        resetField('title')
        resetField('detail')
        resetField('user')
        setCreateShow(false)
        getData()
      })
  }

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Meeting rooms</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Mettings-rooms</li>
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
                  <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    events={events}
                    onSelectEvent={handleSelectMeeting}
                    onSelectSlot={handleSelectEvent}
                    selectable
                  />
                  {/* Create Blog Madal */}
                  <Modal centered show={createShow}>
                      <Modal.Header>
                        <Modal.Title>Create Meeting</Modal.Title>
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
                              <Form.Label>Detail</Form.Label>
                              <Form.Control
                                as="textarea" rows={3}
                                {...register("detail", { required: true })}
                              />
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>User</Form.Label>
                              <Form.Control
                                {...register("user", { required: true })}
                              />
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>Start</Form.Label>
                              <Form.Control
                                value={start}
                                {...register("start", { required: true })}
                              />
                            </Form.Group>
                            <Form.Group as={Col} md="12">
                              <Form.Label>End</Form.Label>
                              <Form.Control
                                value={end}
                                {...register("end", { required: true })}
                              />
                            </Form.Group>
                          </Row>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={handleSubmit(handleCreateEvent)}
                        >
                          Save Changes
                        </Button>
                        <Button variant="secondary" onClick={CreateClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                     {/* View Blog Madal */}
                     <Modal centered show={viewShow}>
                      <Modal.Header>
                        <Modal.Title>View Meeting</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form.Group>
                          <Form.Label>Title</Form.Label> : {title}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Detail</Form.Label> : {detail}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>User</Form.Label> : {user}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Start</Form.Label> :  { dayjs(start).format("DD-MMMM-YYYY") }
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>End</Form.Label> :  { dayjs(end).format("DD-MMMM-YYYY") }
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                      <Button variant="danger" onClick={hanldeDelete}>
                          Delete
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
  );
}
