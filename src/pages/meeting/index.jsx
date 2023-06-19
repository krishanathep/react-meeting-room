import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

export default function meeting() {

  const localizer = momentLocalizer(moment);
  const navigate = useNavigate();

  const handleSelectMeeting = (event) => {
      navigate('view/'+event.id)
    }

  const handleSelectSlot = ({start, end}) => {
    //alert(start + end)
    navigate('create')
  }


  const myMeetingList = ([
    {
      id: 1,title: "Meeting room 1", start: "2023-01-25", end: "2023-01-25"
    },
    {
      id: 2,title: "Meeting room 2", start: "2023-01-25", end: "2023-01-25"
    },
    {
      id: 3,title: "Meeting room 1", start: "2023-01-20", end: "2023-01-20"
    },
    {
      id: 4,title: "Meeting room 1", start: "2023-01-10", end: "2023-01-10"
    },
    {
      id: 5,title: "Meeting room 2", start: "2023-01-03", end: "2023-01-03"
    },
    {
      id: 6,title: "Meeting room 1", start: "2023-01-15", end: "2023-01-15"
    },
    {
      id: 7,title: "Meeting room 2", start: "2023-01-29", end: "2023-01-29"
    },
    {
      id: 8,title: "Meeting room 1", start: "2023-01-07", end: "2023-01-07"
    },
    {
      id: 9,title: "Meeting room 2", start: "2023-01-07", end: "2023-01-07"
    },
  ])

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
                    style={{ height: 500 }}
                    events={myMeetingList}
                    onSelectEvent={handleSelectMeeting}
                    onSelectSlot={handleSelectSlot}
                    selectable
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
