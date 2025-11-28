import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../API";
import logo from "../assets/images/logo.png";
import { ToastContainer, toast, Bounce } from "react-toastify";

const admin = () => {
  const { register, handleSubmit, reset } = useForm();

  const [type, setType] = useState([]);

  async function getType() {
    const res = await api.get("room_type");
    setType(res.data);
  }

  useEffect(() => {
    getType();
  }, []);

  async function addType(data) {
    await api.post("room_type", data).then((res) => {
      reset();
      getType();
    });
  }

  async function trashType(id) {
    if (confirm("do you want delete this room type ...!")) {
      try {
        await api.delete(`room_type/${id}`);
        toast.success("Room Type deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        getType()
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
      <div className="row w-100 m-0" style={{ height: "100vh" }}>
        <div className="col-lg-2 bg-dark m-0 p-0">
          <div className="row justify-content-center m-0 p-3 align-items-center">
            <div className="col text-light gap-3">
              <img src={logo} alt="" width={200} height={60} />
            </div>
          </div>
          <ul className="p-0 list-unstyled d-flex flex-column gap-2">
            <li className="">
              <button className="btn btn-primary w-100 rounded-0 text-capitalize">
                add room type
              </button>
            </li>
            <li className="">
              <a href="/">
                <button className="btn btn-outline-danger w-100 rounded-0 text-capitalize">
                  logout
                </button>
              </a>
            </li>
          </ul>
        </div>
        <div className="col">
          <div className="container p-5">
            <div className="col mx-auto mt-3">
              <h2 className="text-capitalize">add room type</h2>
              <form action="" onSubmit={handleSubmit(addType)}>
                <label htmlFor="type" className="text-capitalize form-label">
                  room type
                </label>
                <input
                  type="text"
                  {...register("room_type")}
                  className="form-control"
                  placeholder="Enter Room Type"
                  required
                  autoFocus
                />
                <button className="btn btn-primary text-capitalize mt-3">
                  add
                </button>
              </form>
            </div>
            <div className="container mt-3">
              <table className="table text-capitalize">
                <thead>
                  <tr>
                    <th>no</th>
                    <th>types</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {type.length === 0 ? (
                    <tr>
                      <td
                        colSpan={2}
                        className="text-center fw-bold text-capitalize"
                      >
                        no data found
                      </td>
                    </tr>
                  ) : (
                    type.map((ele, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{ele.room_type}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              className="btn btn-outline-info"
                              onClick={() => trashType(ele.id)}
                            >
                              edit
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => trashType(ele.id)}
                            >
                              delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default admin;