import { useContext, useState } from "react";
import { context } from "../../Layout/Authentication/NewProvider";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { signUpUser, updateUserProfile } = useContext(context);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const intialData = Object.fromEntries(formData.entries());
    // signUpUser(intialData)
    const form = e.target;
    const name = form.nam.value;
    const email = form.email.value;
    const password = form.password.value;
    const conPassword = form.confirmPassword.value;
    const photoURL = form.image.value;
    
    // password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
    } else if (!/[A-Z]/.test(password)) {
      setError("Password must include at least one uppercase letter.");
    } else if (!/[a-z]/.test(password)) {
      setError("Password must include at least one lowercase letter.");
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      setError("Password must include at least one special character.");
    } else {
      setError("");
      //   alert("✅ Password is valid!");
    }
    if (password !== conPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
      //   alert("✅ Passwords match and form submitted!");
    }
  signUpUser(email, password)
  .then((userCredential) => {
    const user = userCredential.user; // ✅ assign it here
    console.log("User created:", user);

    return updateUserProfile(user, name.trim(), photoURL.trim());
  })
  .catch((error) => {
    if (error.code === "auth/email-already-in-use") {
      alert("This email is already registered. Please login instead.");
    } else {
      alert(error.message);
    }
  });
  navigate("/")

    // update profile
    // updateUserProfile(user, {
    //   displayName: name.trim(),
    //   photoURL: photoURL.trim(),
    // })
    //   .then(() => {
    //     console.log("✅ Profile updated");
    //   })
    //   .catch((error) => {
    //     console.error("❌ Error:", error.message);
    //   });
  };

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold text-green-600 text-center">
        Registration
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 mx-auto space-y-4 p-10 shadow-2xl"
      >
        {/* username */}
        <div>
          <label
            htmlFor="name"
            className="text-[15px] dark:text-slate-300 text-text font-[400]"
          >
            User name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nam"
            placeholder="User name"
            className="border-border dark:bg-transparent dark:border-slate-600 dark:placeholder:text-slate-600 dark:text-slate-300 border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
          />
        </div>
        {/* email */}
        <div>
          <label
            htmlFor="name"
            className="text-[15px] dark:text-slate-300 text-text font-[400]"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="email"
            required
            placeholder="Your Email"
            className="border-border dark:bg-transparent dark:border-slate-600 dark:placeholder:text-slate-600 dark:text-slate-300 border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
          />
        </div>
        {/* password */}
        <div>
          <label
            htmlFor="name"
            className="text-[15px] dark:text-slate-300 text-text font-[400]"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="password"
            placeholder="Your Password"
            className="border-border dark:bg-transparent dark:border-slate-600 dark:placeholder:text-slate-600 dark:text-slate-300 border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        {/* confirm password */}
        <div>
          <label
            htmlFor="name"
            className="text-[15px] dark:text-slate-300 text-text font-[400]"
          >
            confirm password<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="confirmPassword"
            placeholder="confirm password"
            className="border-border dark:bg-transparent dark:border-slate-600 dark:placeholder:text-slate-600 dark:text-slate-300 border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        {/* email */}
        <div>
          <label
            htmlFor="name"
            className="text-[15px] dark:text-slate-300 text-text font-[400]"
          >
            Photo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="image"
            placeholder="Your image link"
            className="border-border dark:bg-transparent dark:border-slate-600 dark:placeholder:text-slate-600 dark:text-slate-300 border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
          />
        </div>
        <div className="items-center text-center">
          <button className="p-2 bg-lime-400 rounded-md" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div className="text-center my-5 text-2xl text-black">
        <span>Or</span>
      </div>
      <div className="w-full items-center text-center my-5">
        <Link to="/login">
          <button className="text-3xl hover:underline cursor-pointer">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
