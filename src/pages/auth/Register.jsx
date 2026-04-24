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
    setForm((prev) => ({ ...prev, [name]: value }));
    seterrorName("");
    seterrorContact("");
    seterrorGender("");
    seterrorEmail("");
    seterrorPassword("");
  };

  const handleSubmit = (e) => {
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

    if (form.name.trim().length < 3) return toast.error("Name must be at least 3 characters");
    if (!namePattern.test(form.name)) return toast.error("Invalid Name");
    if (!emailPattern.test(form.email)) return toast.error("Invalid Email");
    if (!passwordPattern.test(form.password)) return toast.error("Weak Password");
    if (!contactPattern.test(form.contact)) return toast.error("Contact must be exactly 10 digits");

    const existingUsers = JSON.parse(localStorage.getItem("User-Data")) || [];
    const userExists = existingUsers.find((u) => u.email === form.email);
    if (userExists) return toast.error("Email already registered");

    existingUsers.push(form);
    localStorage.setItem("User-Data", JSON.stringify(existingUsers));

    toast.success("Registered Successfully");
    setTimeout(() => navigate("/login", { replace: true }), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-300 p-4">
  <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/40 rounded-2xl shadow-2xl p-6 space-y-4">
    <h2 className="text-2xl font-bold text-center text-gray-900">Create Account</h2>
    <p className="text-center text-gray-800 text-sm">Register to get started</p>

    <form onSubmit={handleSubmit} className="space-y-3">

    
      <div>
        <label className="block text-gray-900 font-medium mb-1 text-sm">Full Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2.5 rounded-lg bg-white/30 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-sm"
        />
        {errorName && <p className="text-red-500 text-xs mt-1">{errorName}</p>}
      </div>

   
      <div>
        <label className="block text-gray-900 font-medium mb-1 text-sm">Email Address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2.5 rounded-lg bg-white/30 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-sm"
        />
        {errorEmail && <p className="text-red-500 text-xs mt-1">{errorEmail}</p>}
      </div>

    
      <div>
        <label className="block text-gray-900 font-medium mb-1 text-sm">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2.5 rounded-lg bg-white/30 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-sm"
        />
        {errorPassword && <p className="text-red-500 text-xs mt-1">{errorPassword}</p>}
      </div>

      
      <div>
        <label className="block text-gray-900 font-medium mb-1 text-sm">Contact Number</label>
        <input
          type="text"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          className="w-full p-2.5 rounded-lg bg-white/30 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-sm"
        />
        {errorContact && <p className="text-red-500 text-xs mt-1">{errorContact}</p>}
      </div>

     
      <div>
        <label className="block text-gray-900 font-medium mb-1 text-sm">Gender</label>
        <div className="flex gap-6 text-gray-900 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" value="male" onChange={handleChange} />
            Male
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" value="female" onChange={handleChange} />
            Female
          </label>
        </div>
        {errorGender && <p className="text-red-500 text-xs mt-1">{errorGender}</p>}
      </div>

     
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white py-2.5 rounded-lg font-semibold transition duration-300 shadow-md hover:scale-105 text-sm"
      >
        Register
      </button>
    </form>

    <p className="text-center text-gray-700 text-sm">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-600 hover:underline font-semibold">
        Login
      </Link>
    </p>
  </div>
</div>
  );
};

export default Register;