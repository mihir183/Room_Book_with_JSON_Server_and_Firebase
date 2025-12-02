import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../API";
import logo from "../assets/images/logo.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Admin_Header from "../Component/Admin_Header";
import { Link } from "react-router-dom";
import Add_Room from "../Component/Add_Room";
import Show_Book from "../Component/Show_Book";

const admin = () => {
  const [showRoom,setRoom] = useState(1)
  
  return (
    <>
      <div className="row w-100 m-0" style={{ height: "100vh" }}>
        <div className="col-3 col-sm-4 col-md-3 col-lg-3 bg-dark m-0 p-0">
          <div className="row justify-content-center m-0 p-3 align-items-center">
            <div className="col text-light gap-3 ">
              <img
                src={logo}
                alt=""
                className="p-0 object-fit-cover w-100"
                height={60}
              />
            </div>
          </div>
          <ul className="p-0 list-unstyled d-flex flex-column gap-2">
            <li className="">
              <button className="btn btn-primary w-100 rounded-0 text-capitalize" onClick={()=>setRoom(1)}>
                add room type
              </button>
            </li>
            <li className="">
                <button className="btn btn-primary w-100 rounded-0 text-capitalize" onClick={()=>setRoom(0)}>
                  show booking
                </button>
            </li>
            <li className="">
              <Link href="/">
                <button className="btn btn-outline-danger w-100 rounded-0 text-capitalize">
                  logout
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <Admin_Header />
          {
            showRoom == 1
            ?
            <Add_Room/>
            :
            <Show_Book/>

          }
        </div>
      </div>
    </>
  );
};

export default admin;
