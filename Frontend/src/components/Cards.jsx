import React, { useContext, useEffect, useState } from "react";
import events from "../assets/data/events";
import { AuthStore } from "../screen/store/AuthStore";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Participants from "./Participants";
import Success from "./Sucess";

const Cards = () => {
  const [eventList, setEvent] = useState([events]);
  let [msg, setMsg] = useState();
  let [participants, setParticipants] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/event/api/showEvent"
        );
        setEvent(response.data.event);
      } catch (err) {
        console.log("error in useEffect are " + err);
      }
    };

    fetchData();
  }, []);

  const { token } = useContext(AuthStore);
  let decode = null;
  if (token) decode = jwtDecode(token);

  const participate = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/event/api/addParticipate",
        { _id: id, token: decode.userId },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        setMsg(response.data);
        setTimeout(() => {
          setMsg(undefined);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const viewParticipants = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/event/api/viewParticipants",
        { _id: id },
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log(response.data.participants);
      if (response.data.success) {
        setParticipants(response.data.participants);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex ml-5 flex-wrap w-screen bg-gradient-to-r from-[#090617] to-[#a09fbd]">
        {msg && <Success data={msg} setData={setMsg} />}
        {eventList && eventList.map((event, idx) => (
          <div key={idx} className="m-1 p-5 w-[30vw] shadow-md from-blue-50 border-2 rounded-md">
            <img
              src={`http://localhost:8080/images/${event.photo}`}
              className="w-[25vw] h-[55vh] "
              alt="singing..."
            />
            <div className="text-3xl">{event.eventName}</div>
            <div className="text-sm">id: {event._id}</div>
            <div className="text-lg">Desc:{event.description}</div>
            <div className="flex">
              <div>
                <div>Event is on : {event.date}</div>
                <div>Time: {event.time}</div>
                <div>Maximum number of seats are: {event.maxAttendees}</div>
              </div>

              {token && decode.role === "user" && (
                  <button onClick={(e) => participate(e, event._id)}
                    className="ml-10 border bg-orange-500 h-10 w-32 text-xl hover:brightness-50">
                    participate
                  </button>     
              )}
              {token && decode.role === "organizer" && (
                  <button onClick={(e) => viewParticipants(e, event._id)}  
                    className="ml-10 border bg-orange-500 h-20 w-32 text-xl hover:brightness-50">
                    View Participants
                  </button>
              )}
            </div>
          </div>
        ))}
      </div>
        <div>
          {participants && <Participants data={participants} setData={setParticipants} />}
        </div>
    </div>
  );
};

export default Cards;
