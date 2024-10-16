import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import images from "../assets/images2.jpeg";
import Cards from "../components/Cards";
import { AuthStore } from "./store/AuthStore";
import {jwtDecode} from 'jwt-decode'

export default function () {
  const { token, handleLogout } = useContext(AuthStore);
  let decode=null;
  if(token){
    decode = jwtDecode(token)
  }


  return (
    <>
      <Navbar />
      <Navbar2 />
      <div className="main">
        <div className="box">
          <div className="box1">
            "Welcome to EventHub – Your one-stop platform to discover, organize,
            and attend amazing events! Whether you're looking for the latest
            tech conferences, marketing workshops, or startup pitch nights, we
            have it all. Explore upcoming events, secure your spot, and make the
            most out of your experience. Organizers can easily manage their
            events, track attendees, and create unforgettable experiences for
            everyone."
            <div className="box1-bottom">
              {!token ? (
                <div className="signUP m-3">
                  <NavLink to="/signup" className="signUP ">
                    SIGNUP
                  </NavLink>
                  <NavLink to="/login" className="login ">
                    Login
                  </NavLink>
                </div>
              ) : (
                <div>
                  <button className="signUP" onClick={() => handleLogout()}>
                    Logout
                  </button>
                  {decode.role === "organizer" &&
                  <NavLink to="/event" className="login ">
                    Add Event
                  </NavLink>
                 }
                </div>
              )}
            </div>
          </div>

          <div className="container-poll">
            <h1 className="poll-question text-white">
              Are you interested in this event?
            </h1>
            <input type="radio" id="yes" name="poll" value="0" />
            <label htmlFor="yes" className="text-white ml-3 text-xl">
            
              yes
            </label>
            <br />
            <input type="radio" id="no" name="poll" value="0" />
            <label htmlFor="no" className="text-white ml-3 text-xl">
             
              no
            </label>
          </div>

          <div>
            <img src={images} alt="events" />
          </div>
        </div>

        <div className="container">
          <Cards />
        </div>
      </div>
    </>
  );
}
