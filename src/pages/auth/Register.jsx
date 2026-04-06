import React, { useState } from "react";
import { toast } from "react-hot-toast";

import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    gender: "",
  });

  const [errorName, seterrorName] = useState("");
  const [errorEmail, seterrorEmail] = useState("");
  const [errorPassword, seterrorPassword] = useState("");
  const [errorContact, seterrorContact] = useState("");
  const [errorGender, seterrorGender] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    seterrorName("");
    seterrorContact("");
    seterrorGender("");
    seterrorEmail("");
    seterrorPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    const contactPattern = /^[0-9]{10}$/;

    if (!form.name) return seterrorName("Please enter name!!");
    if (!form.email) return seterrorEmail("Please enter email!!");
    if (!form.password) return seterrorPassword("Please enter password!!");
    if (!form.contact) return seterrorContact("Please enter contact!!");
    if (!form.gender) return seterrorGender("Please select gender!!");

    if (form.name.trim().length < 3) {
      return toast.error("Name must be at least 3 characters");
    }

    if (!namePattern.test(form.name)) {
      return toast.error("Invalid Name");
    }

    if (!emailPattern.test(form.email)) {
      return toast.error("Invalid Email");
    }

    if (!passwordPattern.test(form.password)) {
      return toast.error("Weak Password");
    }

    if (!contactPattern.test(form.contact)) {
      return toast.error("Contact must be exactly 10 digits");
    }

    // try {
    //   await axios.post(
    //     "http://localhost:5000/api/auth/register",
    //     form
    //   );

    //   toast.success("Registered Successfully");

    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 1200);
    // } catch (err) {
    //   toast.error(err.response?.data?.message || "Error");
    // }
  
    const existingUser=JSON.parse(localStorage.getItem("User-Data"))||[]
    const userExists = existingUser.find((u) => u.email === form.email);
    if (userExists) {
  return toast.error("Email already registered");
}
    existingUser.push(form)
    localStorage.setItem("User-Data",JSON.stringify(existingUser))
  
  toast.success("Registered Successfully");
    setTimeout(() => {
        navigate("/login",{replace:true});
      }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-6">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 space-y-5">

        <h2 className="text-3xl font-bold text-center text-white">
          Create Account
        </h2>
        <p className="text-center text-gray-300 text-sm">
          Register to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errorName && (
              <p className="text-red-400 text-sm mt-1">{errorName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
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
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errorPassword && (
              <p className="text-red-400 text-sm mt-1">{errorPassword}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errorContact && (
              <p className="text-red-400 text-sm mt-1">{errorContact}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <p className="text-gray-300 mb-1">Gender</p>
            <div className="flex gap-6 text-white">
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="male" onChange={handleChange} />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="female" onChange={handleChange} />
                Female
              </label>
            </div>
            {errorGender && (
              <p className="text-red-400 text-sm mt-1">{errorGender}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md"
          >
            Register
          </button>
        </form>

        {/* Bottom Text */}
        <p className="text-center text-gray-300 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;   