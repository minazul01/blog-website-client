import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { context } from "../../Layout/Authentication/NewProvider";

const Login = () => {
  const location = useLocation();
  // console.log(location)
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const {googleUser,signInUser} = useContext(context);
  


  const handleLoging = (e) => {
    e.preventDefault();

    const event = e.target;

    const email = event.email.value;
    const password = event.password.value;
   

    signInUser(email, password)
    //   .then(() => {
    //     toast.success("🎉 Congratulation! You are Login success...");
    //     setError(""); // ✅ properly closed
    //     // navigate(location.state.from);
    //   })
    //   .catch((error) => {
    //     setError("Login error:", error.message);
    //   });
  };



   const googleLog = () => {
    googleUser()
    .then(() => {
    //   navigate(location.state.from)
     
    });
  };
  return (
    <div>
      <form onSubmit={handleLoging}>
        <h1 className="text-3xl font-bold text-center my-10">Please Login!</h1>
        <div className="w-full flex justify-center my-16">
          <div className="p-10 bg-gray-200 rounded-lg">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-xl font-medium">
                What is your Email?
              </legend>
              <input
                type="email"
                name="email"
                required
                className="input w-[250px] md:w-[450px] h-10 md:h-[60px] text-lg px-4 rounded-2xl"
                placeholder="Email here"
              />
              <legend className="fieldset-legend text-xl font-medium">
                What is your Password?
              </legend>
              <input
                type="password"
                name="password"
                className="input w-[250px] md:w-[450px] h-10 md:h-[60px] text-lg px-4 rounded-2xl"
                placeholder="Password here"
              />
              {error && <p className="text-red-500">{error}</p>}

              <legend className="fieldset-legend text-base font-normal hover:underline">
                Forget password?
              </legend>
              <button className="py-2 px-3 bg-lime-500 rounded-md text-xl font-bold hover:bg-gray-50 cursor-pointer my-5 md:my-10">
                Login
              </button>
              <p className="text-base font-normal text-center">or</p>
              <button
                onClick={googleLog}
                className=" bg-[#3B9DF8] text-white rounded-md mt-5 cursor-pointer py-[5px] pl-[5px] pr-4 flex items-center justify-center gap-[10px] text-[1rem] hover:bg-blue-500 transition-all duration-200"
              >
                <div className="p-2 rounded-full bg-white">
                  <img
                    src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
                    alt="google logo"
                    className="w-[23px]"
                  />
                </div>
                Sign in with Google
              </button>
               <p className="text-base font-normal text-center">or</p>
              <Link to="/register" className="text-center">
                <button className="text-xl font-medium hover:underline cursor-pointer">
                  Register
                </button>
              </Link>
            </fieldset>
          </div>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;