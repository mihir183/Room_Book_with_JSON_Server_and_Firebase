import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../API";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../firebase";
import "../assets/css/login.css";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [see, setSee] = useState("password");
  const navigate = useNavigate();
  const [users, setUsers] = useState();

  function show() {
    if (see == "password") {
      setSee("text");
    } else {
      setSee("password");
    }
  }

  async function getUsers() {
    const res = await api.get("/users");
    setUsers(res.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function check(data) {
    const existUser = users.find((ele) => {
      return ele.username == data.username;
    });

    if (existUser) {
      if (existUser.pass === data.pass) {
        const res = await api.get("/cur_user");
        const findCurUser = res.data;
        if(findCurUser.length === 0){
          await api.post("/cur_user", existUser);
          if(existUser.username == "mihir" && existUser.pass == "123"){
          navigate("/admin");
          }else{
            navigate("/home");
          }
          reset();
        }else{
          findCurUser.map(async(ele) => {
            await api.delete(`/cur_user/${ele.id}`)
          });

          await api.post("/cur_user", existUser);
          if(existUser.username == "mihir" && existUser.pass == "123"){
          navigate("/admin");
          }else{
            navigate("/home");
          }
          reset();  
        }
      } else {
        toast.error("Username OR Password is Wrong");
      }
    } else {
      toast.error("Username OR Password is Wrong");
    }
  }

  const signup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const data = {
          username: res.user.displayName,
          email: res.user.email,
          profile: res.user.photoURL,
        };
        // console.log(data)
        await api
          .post("/cur_user", data)
          .then((res) => {
            alert("success");
            navigate("/home");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="back bg-light">
        <div className="form-box col-10 col-sm-8 col-md-5 col-lg-3 mx-auto p-4 shadow rounded-2 ">
          <h2 className="text-capitalize mb-3">login</h2>
          <form action="" onSubmit={handleSubmit(check)}>
            <label htmlFor="username" className="form-label text-capitalize">
              username
            </label>
            <input
              type="text"
              {...register("username")}
              className="form-control"
              placeholder="Enter Username"
              required
              autoFocus
            />
            <label htmlFor="password" className="form-label text-capitalize">
              password
            </label>
            <div className="input-group">
              <input
                id="pwd"
                type={see}
                {...register("pass")}
                className="form-control"
                placeholder="Enter Username"
                required
              />
              <button type="button" className="btn btn-light" onClick={show}>
                <FaEye />
              </button>
            </div>

            <p className="text-capitalize text-end my-2">
              don't have account{" "}
              <a href="/register" className="text-capitalize">
                signup
              </a>
            </p>

            <button className="btn btn-primary mt-1 w-100 text-capitalize">
              login
            </button>
          </form>

          <button
            type="button"
            className="btn border border-1 border-dark text-capitalize w-100 my-2 shadow"
            onClick={signup}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              alt=""
              width={25}
              className="mx-2"
            />
            sign up with google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
