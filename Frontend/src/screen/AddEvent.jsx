import React, { useContext, useReducer, useState } from 'react'
import { AuthStore } from './store/AuthStore'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Success from '../components/Sucess'

const initial = {
    eventName:'',
    description:"",
    date:'',
    time:'',
    venue:'',
    organizer:'',
    photo:'',
}

const eventReducer = (state, action) => {
    let newState = state;
    if(action.type === 'eventName')
        newState = {...state, eventName:action.payload}
    else if(action.type === 'description')
        newState = {...state, description:action.payload}
    else if(action.type === 'date')
        newState = {...state, date:action.payload}
    else if(action.type === 'time')
        newState = {...state, time:action.payload}
    else if(action.type === 'venue')
        newState = {...state, venue:action.payload}
    else if(action.type === 'photo')
        newState = {...state, photo:action.payload}

    return newState;
}


const AddEvent = () => {

    const [message, setMessage] = useState();
    const [event, dispatchEvent] = useReducer(eventReducer, initial)
    const {token} = useContext(AuthStore)
    let decode = jwtDecode(token);
    event.organizer = decode.userId;
    const navigate = useNavigate();


  const formDataToSend = new FormData();

  // Append all form fields to FormData
  formDataToSend.append('eventName', event.eventName);
  formDataToSend.append('organizer', event.organizer);
  formDataToSend.append('time', event.time);
  formDataToSend.append('venue', event.venue);
  formDataToSend.append('description', event.description);
  formDataToSend.append('date', event.date);
  // Append the file (photo) to FormData
  formDataToSend.append('photo', event.photo);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{

        // const fetchedData= new URLSearchParams(event).toString();
        
        const response = await axios.post(
            'http://localhost:8080/event/api/addEvent',
            formDataToSend,
        );

        if(response.status === 201){
            setMessage(response.data.message)
            setTimeout(()=>{
                navigate('/')
            },1000)
        }
            }catch(err){
                console.log("error in addEvent : " + err)
                setMessage(response.data.message)
                setTimeout(() => {
                    setMessage(undefined);
                }, 2000);
            }
    }
  return (
    <div className="flex m-5 bg-slate-200">
        {message && <Success data={message} />}
        <form onSubmit={(e)=>handleSubmit(e)} encType='multipart/form-data'>
            <div className="text-xl font-semibold">
                <label htmlFor="eventName">Event Name
                <input type="text" name="event" value={event.eventName}
                placeholder='event name'
                className="flex p-2 mb-2 h-[10vh] w-[80vw] border-4"
                onChange={(e) => dispatchEvent({type:'eventName', payload:e.target.value})}/>
                </label>

                <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Upload Event Photo
              </label>
              <input name="photo" className="form-control" type="file"
                onChange={(e) => dispatchEvent({type:'photo', payload:e.target.files[0]})}
                accept="image/*" required />
              <div className="invalid-feedback">
                Please upload a valid photo
              </div>
            </div>

                <label htmlFor="description">description 
                <input type="textarea" name="description" value={event.description}
                placeholder='description'
                className="flex p-2 mb-2 h-[10vh] w-[80vw] border-4"
                onChange={(e) => dispatchEvent({type:'description', payload:e.target.value})}/>
                </label>

                <label htmlFor="date">Event date
                <input type="date" name="date" value={event.date}
                placeholder='event date'
                className="flex p-2 mb-2 h-[10vh] w-[80vw] border-4"
                onChange={(e) => dispatchEvent({type:'date', payload:e.target.value})}/>
                </label>

                <label htmlFor="time">Event time
                <input type="time" name="time" value={event.time}
                placeholder='event timing'
                className="flex p-2 mb-2 h-[10vh] w-[80vw] border-4"
                onChange={(e) => dispatchEvent({type:'time', payload:e.target.value})}/>
                </label>

                <label htmlFor="eventName">Event venue
                <input type="text" name="venue" value={event.venue}
                placeholder='event venue'
                className="flex p-2 mb-2 h-[10vh] w-[80vw] border-4"
                onChange={(e) => dispatchEvent({type:'venue', payload:e.target.value})}/>
                </label>

                <button type="submit" className="flex p-2 mb-2 border-4">Add</button>
            </div>
        </form>
        
    </div>
  )
}

export default AddEvent