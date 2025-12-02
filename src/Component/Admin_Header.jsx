import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useEffect } from "react";
import api from "../API";
import { useState } from "react";
const Admin_Header = () => {
  const navigate = useNavigate();
  const [curUser, setUser] = useState([]);

  // Fetch Current User
  async function fetchUser() {
    const res = await api.get("/cur_user");
    setUser(res.data);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function logout() {
    try {
      const res = await api.get("/cur_user"); // get all items
      const items = res.data;

      for (const item of items) {
        await api.delete(`/cur_user/${item.id}`);
      }
      navigate("/");
    } catch {
      toast.error("error");
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse w-100 justify-content-end" id="navbarSupportedContent">
           
            <form>
              {curUser.length === 0 ? (
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => navigate("/")}
                >
                  login
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-danger mx-3"
                    onClick={logout}
                  >
                    logout
                  </button>
                  {curUser.map((ele) => (
                    <img
                      key={ele}
                      src={
                        ele.profile ||
                        "https://images6.alphacoders.com/137/thumb-1920-1379466.png"
                      }
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-circle"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </>
              )}
            </form>
          </div>
        </div>
      </nav>

      {/* Profile Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
        data-bs-backdrop="false"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-5">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              {curUser.map((ele) => (
                <div key={ele}>
                  <p>{ele.username}@gmail.com</p>
                  <img
                    src={
                      ele.profile ||
                      "https://images6.alphacoders.com/137/thumb-1920-1379466.png"
                    }
                    alt=""
                    className="rounded-circle"
                    width={100}
                    height={100}
                  />
                  <h3 className="text-capitalize">hi, {ele.username}</h3>
                  <button className="btn btn-outline-primary rounded-5 px-4 py-2 text-capitalize">
                    manage youre account
                  </button>
                  <div className="btn-group w-75 my-2 rounded-5">
                    <button
                      className="btn btn-secondary p-3 text-capitalize"
                      onClick={logout}
                    >
                      logout
                    </button>
                    <button className="btn btn-danger p-3 text-capitalize">
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_Header;