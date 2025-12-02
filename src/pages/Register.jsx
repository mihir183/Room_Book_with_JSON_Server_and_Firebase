import { useForm } from "react-hook-form";
import api from "../API";
import { useNavigate } from "react-router-dom";
import "../assets/css/login.css"

const Register = () => {
    const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm();

    async function addUser(data){
        if(data.pass === data.cpass){
            await api.post("/users",data)
            .then(res=>{
                navigate("/")
                reset()
            })
            .catch(err=>console.log(err))
        }else{
            alert("Invalid Data....!")
        }
    }
  return (
    <>
    <div className="back bg-light">
      <div className="form-box col-lg-3 mx-auto mt-5 p-4 shadow rounded-2">
        <h2 className="text-capitalize mb-3">Register</h2>
        <form action="" onSubmit={handleSubmit(addUser)}>
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
          <label htmlFor="email" className="form-label text-capitalize">
            email
          </label>
          <input
            type="text"
            {...register("email")}
            className="form-control"
            placeholder="Enter Email"
            required
          />
          <label htmlFor="profile" className="form-label text-capitalize">
            profile
          </label>
          <input
            type="text"
            {...register("profile")}
            className="form-control"
            required
          />
          <label htmlFor="password" className="form-label text-capitalize">
            password
          </label>
          <input
            id="pwd"
            type="password"
            {...register("pass")}
            className="form-control"
            placeholder="Enter Username"
            required
          />
          <label htmlFor="cpassword" className="form-label text-capitalize">
            comfirm password
          </label>
          <input
            type="password"
            {...register("cpass")}
            className="form-control"
            placeholder="Enter Username"
            required
          />

          <p className="text-capitalize text-end my-2">
            have an account
            <a href="/" className="text-capitalize">
              sign in
            </a>
          </p>

          <button className="btn btn-primary mt-1 w-100 text-capitalize">
            register
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
