import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import api from "../API";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState([]);
  const [allRoom, setAllRoom] = useState([]);
  const [search, setSearch] = useState([]);

  // console.log(import.meta.env.VITE_API)
  async function fetchData() {
    const result = await api.get("/room");
    setRoom(result.data);
    setAllRoom(result.data);
    setSearch(result.data);
  }

  // Delete Task Function
  async function trashTask(id) {
    if (confirm("do you want delete this task.....!")) {
      await api.delete(`/room/${id}`);
      fetchData();
    }
    toast.success("Room Booking deleted successfully!", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  // Searching Data Function
  async function searching(data) {
    if (data.trim() === "") {
      setAllRoom(room);
      return;
    }

    const filtered = room.filter(
      (ele) =>
        ele.customer.toLowerCase().includes(data.toLowerCase()) ||
        ele.email.toLowerCase().includes(data.toLowerCase()) ||
        ele.phone.toLowerCase().includes(data.toLowerCase()) ||
        ele.room_type.toLowerCase().includes(data.toLowerCase()) ||
        ele.total_person.toString().includes(data.toLowerCase())
    );

    setAllRoom(filtered);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row flex-row-reverse">
          <div className="col-lg-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search by Task Name/Assign/Status"
              onChange={(e) => searching(e.target.value)}
            />
          </div>
        </div>
      </div>
      <table className="container table mt-4">
        <thead>
          <tr>
            <td className="text-capitalize">sr.no</td>
            <td className="text-capitalize">room owner</td>
            <td className="text-capitalize">total person</td>
            <td className="text-capitalize">room type</td>
            <td className="text-capitalize">action</td>
          </tr>
        </thead>
        <tbody>
          {
          allRoom.length === 0
          ?
          <tr>
            <td colSpan={5} className="text-center fw-bold">No Data Found</td>
          </tr>
          :
          allRoom && allRoom.map((ele, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{ele.customer}</td>
              <td>{ele.total_person}</td>
              <td>{ele.room_type}</td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-info text-capitalize"
                    onClick={() => navigate(`/updateBook/${ele.id}`)}
                  >
                    edit
                  </button>
                  <button
                    className="btn btn-danger text-capitalize"
                    onClick={() => trashTask(ele.id)}
                  >
                    delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default Home;
