import { useForm } from "react-hook-form";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
// import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import api from "../API";
import { useEffect, useState } from "react";

const BookRoomForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const [roomType, setType] = useState([]);
  const [room, setRoom] = useState([]);
  const [curUser, setUser] = useState({});

  const navigate = useNavigate();

  async function fetchData() {
    const result = await api.get(`/room/${id}`);
    // setRoom(result.data);
    reset(result.data);
  }

  async function fetchUser(){
    const result = await api.get('/cur_user');
    const res = result.data
    const last = res.at(-1)
    setUser(last)
  }

  async function showRoomType(){
    const res = await api.get('/room_type');
    setType(res.data)
  }
  
  useEffect(()=>{
    showRoomType()
    fetchUser()
    reset()
  },[])

  useEffect(() => {
    fetchData();
    fetchUser();
  },[id]);

  // Function to Book Room
  async function bookRoom(data) {
    data.custId = curUser.id
    // console.log(data)
    if (id == null) {
      await api
        .post("/room", data)
        .then((res) => {
          navigate("/home");
        })
        .catch((err) => console.log(err));
    } else {
      await api.put(`/room/${id}`, data);
      navigate("/home");
    }
  }
  
  return (
    <>
      <Header />
      <div className="col-10 col-sm-7 col-md-6 col-lg-8 mt-5 mx-auto">
        <h2>Book Room</h2>
        <form onSubmit={handleSubmit(bookRoom)}>
          <label htmlFor="customer" className="form-label text-capitalize">
            cutomer
          </label>
          <input
            type="text"
            {...register("customer")}
            id="cutomer"
            className="form-control mb-2"
            placeholder="Enter Cutomer Name"
            required
            autoFocus
          />
          <label htmlFor="email" className="form-label text-capitalize">
            customer email
          </label>
          <input
            type="text"
            {...register("email")}
            className="form-control mb-2"
            placeholder="Enter Cutomer Email"
            required
          />
          <label htmlFor="phone" className="form-label text-capitalize">
            phone number
          </label>
          <input
            type="text"
            {...register("phone")}
            className="form-control mb-2"
            placeholder="Enter phone Number"
            required
          />
          <label htmlFor="status" className="form-label text-capitalize">
            room type
          </label>
          <select
            name="type"
            id="type"
            {...register("room_type")}
            className="form-select mb-2"
            required
          >
            <option className="text-capitalize" value="" selected>
              -- select type --
            </option>
            {roomType.map((ele, index) => (
              <option className="text-capitalize" value={ele.room_type} key={index}>
                {ele.room_type}
              </option>
            ))}
          </select>
          <label htmlFor="total" className="text-capitalize form-label">
            totale person
          </label>
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Enter Total Person"
            {...register("total_person")}
            max={10}
          />
          {id == null ? (
            <button className="btn btn-primary text-capitalize">add</button>
          ) : (
            <button className="btn btn-warning text-capitalize">update</button>
          )}
          <button
            className="btn btn-secondary text-capitalize mx-2"
            onClick={() => navigate("/home")}
          >
            back
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default BookRoomForm;