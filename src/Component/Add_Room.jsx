import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import api from "../API";

const Add_Room = () => {
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
        getType();
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
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
    </>
  );
};

export default Add_Room;
