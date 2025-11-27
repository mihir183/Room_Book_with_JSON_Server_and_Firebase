import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../API";

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
    await api
    .post("room_type", data)
    .then(res => {
      reset()
      getType()
    })

  }
  return (
    <>
      <div className="col-lg-6 mx-auto mt-5">
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
          <button className="btn btn-primary text-capitalize mt-3">add</button>
        </form>
      </div>

      <div className="container mt-5">
        <table className="table">
          <thead>
            <tr>
              <th>no</th>
              <th>types</th>
            </tr>
          </thead>
          <tbody>
            {type.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center fw-bold text-capitalize">
                  no data found
                </td>
              </tr>
            ) : (
              type.map((ele,index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{ele.room_type}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default admin;
