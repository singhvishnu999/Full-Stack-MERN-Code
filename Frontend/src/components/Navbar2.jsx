import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

export default function () {
  return (
    <div>
      <nav className="nav h-16 border-hidden mt-[60px] bg-gradient-to-r from-[#120c32] to-[#a09fbd]">
        <div className="container-fluid">
          <div className="bg-auto border-collapse">
            <ul className="mr-3 pt-2 me-auto mb-2 mb-lg-0 flex gap-7 text-white text-xl">
              <li>
                <NavLink to="#">ALL</NavLink>
              </li>
              <li className="hover:bg-cyan-600 active:bg-violet-700">
                <NavLink to="#">Technical</NavLink>
              </li>
              <li>
                <NavLink aria-current="page" to="#">
                  Entertainment
                </NavLink>
              </li>
              <li>
                <NavLink aria-current="page" to="#">
                  Cultural
                </NavLink>
              
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
