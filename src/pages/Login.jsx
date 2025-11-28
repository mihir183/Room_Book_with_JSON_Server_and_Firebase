import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [see,setSee] = useState("password")
  const navigate = useNavigate();

  function show(){
    if(see == "password"){
      setSee("text")
    }else{
      setSee("password")
    }
  }

  function check(data) {
    if(data.username=="admin" && data.pass=="admin123"){
      navigate('/admin')
      reset()
    }else{
      navigate("/home")
      reset()

    }
  }
  return (
    <>
      <div className="col-lg-3 mx-auto mt-5 p-4 shadow rounded-2">
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
            <button type="button" onClick={show}><FaEye/></button>
          </div>

          <button className="btn btn-primary mt-3 w-100 text-capitalize">
            login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;