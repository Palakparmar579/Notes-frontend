import React, { useState } from "react";

import { toast} from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorEmail, seterrorEmail] = useState("");
  const [errorPassword, seterrorPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    seterrorEmail("");
    seterrorPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) return seterrorEmail("Please enter email");
    if (!form.password) return seterrorPassword("Please enter password");

    if (!emailPattern.test(form.email)) {
      return toast.error("Invalid Email");
    }

    // try {
    //   const res = await axios.post(
    //     "http://localhost:5000/api/auth/login",
    //     form
    //   );

    //   localStorage.setItem("token", res.data.token);
    //   localStorage.setItem("email", res.data.email);

   
    //   setTimeout(() => {
    //     navigate("/notes");
    //   }, 1200);
    // } catch (err) {
    //   toast.error(err.response?.data?.message || "Login failed");
    // }


   const UserData = JSON.parse(localStorage.getItem("User-Data")) || [];
    console.log(localStorage.getItem("User-Data"));

    const user = UserData.find(
  (u) =>
    u.email===
    form.email
);
    if(!user){
      return toast.error("User not found with this email")
    }
 if(user.password!==form.password){
      return toast.error("Wrong password")
    }
    localStorage.setItem("email", user.email);

  toast.success("Login successful");
  
        navigate("/notes",{replace:true});
     
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-300 p-6">
  <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/40 rounded-2xl shadow-2xl p-8 space-y-6">
    <h2 className="text-3xl font-bold text-center text-gray-900">
      Welcome Back
    </h2>
    <p className="text-center text-gray-800 text-sm">
      Login to continue your journey
    </p>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/30 text-gray-900 placeholder-gray-600 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errorEmail && <p className="text-red-500 text-sm mt-1">{errorEmail}</p>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/30 text-gray-900 placeholder-gray-600 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errorPassword && <p className="text-red-500 text-sm mt-1">{errorPassword}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md hover:scale-105"
      >
        Login
      </button>
    </form>

    <p className="text-center text-gray-700 text-sm">
      Don’t have an account?{" "}
      <Link to="/register" className="text-blue-600 hover:underline font-semibold">
        Register
      </Link>
    </p>
  </div>
</div>
  );
};

export default Login;