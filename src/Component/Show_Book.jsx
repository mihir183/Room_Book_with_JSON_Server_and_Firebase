import { useEffect, useState } from "react";
import api from "../API";

const Show_Book = () => {
  const [room, setRoom] = useState([]);

  async function getBooking() {
    const res = await api.get("/room");
    setRoom(res.data);
  }

  useEffect(() => {
    getBooking();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <table className="table text-capitalize">
          <thead>
            <tr>
              <th>sr</th>
              <th>costomer name</th>
              <th>costomer email</th>
              <th>booking time</th>
              <th>total person</th>
            </tr>
          </thead>
          <tbody>
            {room.length === 0 ? (
              <tr>
                <td>no data</td>
              </tr>
            ) : (
              room.map((ele,index) => (
                <tr>
                    <td>{index+1}</td>
                    <td>{ele.username}</td>
                    <td>{ele.email}</td>
                    <td>{ele.room_type}</td>
                    <td>{ele.total_person}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Show_Book;
