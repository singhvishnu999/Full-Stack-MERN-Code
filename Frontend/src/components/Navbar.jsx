import {React, useContext} from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Navbar.module.css'
import { AuthStore } from '../screen/store/AuthStore'
export default function Navbar() {
    
  const {token, setToken, handleLogout} = useContext(AuthStore)
    return (
        <>
            <div className={`${styles.nav} sticky-top-0 flex item top-0`}>
                <i className={`${styles.element} fa-solid fa-bars`}></i>
                <i className={`${styles.element} fa-solid fa-guitar`}> Event MG Sys</i>
                <div className={`${styles.search}`}>
                    <i className={`${styles.element} fa-solid fa-magnifying-glass}`}></i>
                    <input type="search" className={`${styles.search}`} placeholder=" Search student, place, company"/>
                </div>

                <div className={`${styles.element2}`}>
                    <i className="elements1 fa-solid fa-circle-half-stroke"></i>
                    {token ?   
                   <button className={`${styles.element1} m-3`} onClick={()=>handleLogout()}>LogOut </button>
                :  
                <div className='float-end'>
                <NavLink to="/login" className={`${styles.element1} m-3`}>Login </NavLink>
                <NavLink to="/signup" className={`${styles.element1}`}>signUp </NavLink>
                </div>
                    }
                </div>
            </div>
        </>
    )
}
