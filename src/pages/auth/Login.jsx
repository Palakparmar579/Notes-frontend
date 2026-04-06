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
      [name]: value.trim(),
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
    u.email.toLowerCase().trim() ===
    form.email.toLowerCase().trim()
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-6">
     
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6">

        <h2 className="text-3xl font-bold text-center text-white">
          Welcome Back
        </h2>
        <p className="text-center text-gray-300 text-sm">
          Login to continue your journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errorEmail && (
              <p className="text-red-400 text-sm mt-1">{errorEmail}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errorPassword && (
              <p className="text-red-400 text-sm mt-1">{errorPassword}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        {/* Bottom Text */}
        <p className="text-center text-gray-300 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;