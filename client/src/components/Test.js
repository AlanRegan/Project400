import { React, Fragment, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import $ from 'jquery';
import DateMomentUtils from '@date-io/moment'; // choose your lib
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
// pick a date util library
import MomentUtils from '@date-io/moment';
import { baseURL } from "../api/api-routes";
import { clientBaseURL } from "../api/client-routes";

const DnDCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);

const onEventDrop = ({ event, start, end, allDay }) => {
    console.log("event clicked");
    console.log(start, event, end, allDay);
};

const Scheduler = ({ setAuth }) => {
    const [name, setName] = useState("");

    const [selectedDate, handleDateChange] = useState();

    const getProfile = async () => {
        try {
            const res = await fetch(baseURL + "/dash", {
                method: "GET",
                headers: { jwt_token: localStorage.jwt_token }
            });

            const parseData = await res.json();
            setName(parseData.name);
        } catch (err) {
            console.error("o");
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    const [events, setEvents] = useState([]);
    // Event
    const [tasks, setTasks] = useState([]);
    const [user_id, setUserId] = useState("");
    const [task_id, setTaskId] = useState("");
    const [taskTitle, setTaskTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    // modal - event creation
    const [showEvent, setShowEvent] = useState(false);
    const handleCloseEvent = () => setShowEvent(false);
    const handleShowEvent = () => setShowEvent(true);

    function convertDate(date) {
        return moment(date).toDate()
    }

    const getEvents = async () => {
        try {
            const response = await fetch(baseURL + "/events",
                {
                    headers: { jwt_token: localStorage.jwt_token }
                });
            let jsonData = await response.json();
            for (let i = 0; i < jsonData.length; i++) {
                jsonData[i].start = convertDate(jsonData[i].start)
                jsonData[i].end = convertDate(jsonData[i].end)
            }
            setEvents(jsonData);
            console.log(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    // module post call
    const onSubmitEventForm = async (e) => {
        e.preventDefault();
        try {
            var title = $("#task_name option:selected").text();
            const body = { task_id, title, start, end };
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("jwt_token", localStorage.jwt_token);
            const response = await fetch(baseURL + "/events", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });
            window.location = clientBaseURL + "/schedule";
        } catch (err) {
            console.log(err.message)
        }
    };

    const getTasks = async () => {
        try {
            const response = await fetch(baseURL + "/tasks",
                {
                    headers: { jwt_token: localStorage.jwt_token }
                });
            const jsonData = await response.json();
            setTasks(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getTasks();
    }, []);


    // const addEvent = ({ event, start, end, allDay }) => {
    //     const newEvent = {
    //         id: events.length,
    //         title: "New event",
    //         start: new Date(new Date(start).setHours(new Date().getHours() - 3)),
    //         end: new Date(new Date(end).setHours(new Date().getHours() + 3)),
    //         desc: "This is a new event"
    //     }

    //     setEvents(state => [...state, newEvent]);
    // };

    // used to update the state of module
    // whenever a new option is selected from the dropdown
    let handleTaskChange = (e) => {
        setTaskId(e.target.value)
    }

    return (
        <Fragment>
            <div className="wrapper" style={{ minHeight: "100vh" }}>
                <DnDCalendar
                    selectable
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultDate={moment().toDate()}
                    localizer={localizer}
                    toolbar
                    resizable
                    onEventDrop={onEventDrop}
                    components={{
                        event: EventComponent,
                        agenda: {
                            event: EventAgenda
                        }
                    }}
                    onSelectSlot={(data) => {
                        handleShowEvent()
                        setStart(data.start)
                        setEnd(data.end)
                        console.log("onSelectEvent", data);
                    }}

                    onSelectEvent={event => alert(event.desc)}
                />
            </div>

            {/* event modal */}
            <Modal show={showEvent} onHide={handleCloseEvent}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="text-center mt-3" onSubmit={onSubmitEventForm}>
                        <label for="tasks">Tasks</label>
                        <select className="form-control" onChange={handleTaskChange} id="task_name">
                            <option value="⬇️ Select a Task ⬇️"> -- Select a Task -- </option>
                            {tasks.map((task) => <option value={task.task_id}>{task.description}</option>)}
                        </select>
                        <label for="start">Start</label>
                        <div className="form-control">
                            <MuiPickersUtilsProvider utils={DateMomentUtils} >
                                <DateTimePicker value={start} onChange={setStart} format="YYYY-MM-DD HH:mm:ss" InputProps={{ disableUnderline: true }} />
                            </MuiPickersUtilsProvider>
                        </div>
                        <label for="start">End</label>
                        <div className="form-control">
                            <MuiPickersUtilsProvider utils={DateMomentUtils} >
                                <DateTimePicker value={end} onChange={setEnd} format="YYYY-MM-DD HH:mm:ss" InputProps={{ disableUnderline: true }} />
                            </MuiPickersUtilsProvider>
                        </div>
                        <button className="btn btn-success mt-2">Add Event</button>
                    </form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default Scheduler;

const EventComponent = ({ start, end, title }) => {
    return (
        <>
            <p>{title}</p>
            <p>{start}</p>
            <p>{end}</p>
        </>
    );
};

const EventAgenda = ({ event }) => {
    return (
        <span>
            <em style={{ color: "magenta" }}>{event.title}</em>
            <p>{event.desc}</p>
        </span>
    );
};
