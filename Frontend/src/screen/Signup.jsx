import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Success from "../components/Sucess";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

export default function Signup() {
  const [message, setMessage] = useState();
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "organizer",
    name: "",
    contact: "",
    email: "",
    password: "",
    Cpassword: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const urlEncodedData = new URLSearchParams(formData).toString();
      const response = await fetch(`http://localhost:8080/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: urlEncodedData,
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setMessage(data);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(data);
        setTimeout(() => {
          setMessage(undefined);
        }, 2000);
      }
    } catch (err) {
      setMessage(data);
      setTimeout(() => {
        setMessage(undefined);
      }, 2000);
    }
  };

  return (
    <div>
      {message && <Success data={message} />}
      <div className="row bg-light mt-5 max-h-screen">
        <h2 className="col-6 offset-3">Signup on event</h2>
        <div className="col-6 offset-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                name="role"
                className="form-control"
                onChange={handleChange}
                value={formData.role}
              >
                <option value="organizer">organizer</option>
                <option value="user">user</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
                <input
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="valid-feedback">Looking good</div>
              <div className="invalid-feedback">Please enter valid Name</div>
            </div>

            <div className="mb-3">
              <label htmlFor="contact" className="form-label">
                Mob/Whatsapp No.
              </label>
              <input
                name="contact"
                className="form-control"
                type="text"
                onChange={handleChange}
                value={formData.contact}
                required
              />
              <div className="invalid-feedback">
                Please enter valid contact number
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                email
              </label>
              <input
                name="email"
                className="form-control"
                type="email"
                onChange={handleChange}
                value={formData.email}
                required
              />
              <div className="invalid-feedback">Please enter valid email</div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                password </label>
             <div className="form-label flex">
              <input
                name="password"
                className="form-control"
                type={toggle?'password':'text'}
                onChange={handleChange}
                value={formData.password}
               placeholder=""
                required
              />
              {toggle ? <FaEye className="relative -left-7 top-3 cursor-pointer" onClick={()=>setToggle(!toggle)}/> : 
              <FaEyeSlash className="relative -left-7 top-3 cursor-pointer" onClick={()=>setToggle(!toggle)}/>
                }
                </div>
                 
              
              <div className="invalid-feedback">
                Please enter valid password
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="Cpassword" className="form-label">
                Confirm password
              </label>
              <input
                name="Cpassword"
                className="form-control"
                type="password"
                onChange={handleChange}
                value={formData.Cpassword}
                required
              />
              <div className="invalid-feedback">
                Please enter valid password
              </div>
            </div>
            <button className="btn btn-success">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}
