import React, { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import Success from "../components/Sucess";
import { AuthStore } from "./store/AuthStore";
import {jwtDecode} from 'jwt-decode';

const loginReducer = (state, action) => {
  let newState = state;
  if (action.type === "email") newState = { ...state, email: action.payload };
  else if (action.type === "password")
    newState = { ...state, password: action.payload };
  else if (action.type === "role") {
    newState = { ...state, role: action.payload };
  }
  return newState;
};

const initialState = {
  role: "organizer",
  email: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  const {setToken} = useContext(AuthStore);

  const [login, dispatch] = useReducer(loginReducer, initialState);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const dataFetched = new URLSearchParams(login).toString();
      let response = await axios.post(
        "http://localhost:8080/user/login",
        dataFetched,
        {
          withCredentials: true ,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      // decode the json Token
      const token = response.data.token;
      
      const decode = jwtDecode(token);

      if (response.status === 200) {
        setMessage(response.data);
        setToken(token)
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(response.data);
        setTimeout(() => {
          setMessage(undefined)
        }, 2000);
      }
    } catch (err) {
      console.log(err.response);

      if (err.response) {
        setMessage(err.response.data);
        setTimeout(() => {
        }, 2000);
      } else {
        setMessage("error occured at server side");
        setTimeout(() => {
        }, 2000);
      }
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleLogin(e)}>
        {message && <Success data={message} />}
        <div className={styles.mainDiv}>
          <div className={styles.box}>
            <div className={styles.heading}>User Login Details</div>
            <div className={styles.email}>
              <label htmlFor="role" className="email">
                <select
                  name="role"
                  onChange={(e) =>
                    dispatch({ type: "role", payload: e.target.value })
                  }
                >
                  <option value="organizer">organizer</option>
                  <option value="user">user</option>
                </select>
              </label>
            </div>
            <div className={styles.email}>
              <label htmlFor="email" className="email">
                User Email
                <input
                  type="email"
                  name="email"
                  value={login.email}
                  onChange={(e) =>
                    dispatch({ type: "email", payload: e.target.value })
                  }
                />
              </label>
            </div>
            <div className={styles.password}>
              <label htmlFor="pasword" className="password">
                Password
                <input
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={(e) =>
                    dispatch({ type: "password", payload: e.target.value })
                  }
                />
              </label>
            </div>
            <button type="submit" className={styles.btn}>
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
