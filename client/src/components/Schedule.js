import { React, Fragment, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { baseURL } from "../api/api-routes";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const Schedule = ({ setAuth }) => {
  const [name, setName] = useState("");
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

  // const [task, setTask] = useState(task);
  const [events, setEvents] = useState([]);

  function convertDate(date) {
    return moment.utc(date).toDate()
  }

  const getEvents = async () => {
    try {
      const response = await fetch(baseURL + "/events",
        {
          headers: { jwt_token: localStorage.jwt_token }
        });
      let jsonData = await response.json();
      setEvents(jsonData);
    } catch (err) {
      console.error(err.message)
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Fragment>
      <div style={{ height: 700 }}>
        <Calendar
          localizer={localizer}
          events={events}
          step={30}
          defaultView='month'
          views={['month', 'week', 'day']}
          defaultDate={new Date()}
        />
      </div>
    </Fragment>
  );
};

export default Schedule;