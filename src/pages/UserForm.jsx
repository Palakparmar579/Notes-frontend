import React, { useState } from "react";
import {toast } from "react-hot-toast";

const UserForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    gender: "",
    skills: [],
    image: null,
  });
  const [errorName,seterrorName]=useState("")
  const [errorEmail,seterrorEmail]=useState("")
  const [errorPassword,seterrorPassword]=useState("")
  const [errorContact,seterrorContact]=useState("")
  const [errorGender,seterrorGender]=useState("")
   const [errorSkills,seterrorSkills]=useState("")
  const [errorImage,seterrorImage]=useState("")
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } 
    else if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((s) => s !== value),
      }));
    } 
    else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
   
    }
    seterrorName("")
  seterrorContact("")
  seterrorGender("")
  seterrorEmail("")
  seterrorImage("")
  seterrorPassword("")
  seterrorSkills("")
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
  const namePattern=/^[A-Za-z\s]+$/;
  const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const contactPattern = /^[0-9]{10}$/;

  if (!form.name) return seterrorName("Please enter name!!");
  if (!form.email) return seterrorEmail("Please enter your email!!");
  if (!form.password) return seterrorPassword("Please enter password!!");
  if (!form.contact) return seterrorContact("Please enter contact!!");
  if (!form.gender) return seterrorGender("Please enter gender!!");
  if (form.skills.length===0) return seterrorSkills("Please enter skills!!");
   if (!form.image) return seterrorImage("Please submit image!!");
   if (form.name.trim().length < 3) {
  toast.error("Name must be at least 3 characters");
  return;
}
   if(!namePattern.test(form.name)){
  return toast.error("Invalid Name")
  }

  if(!emailPattern.test(form.email)){
  return toast.error("Invalid Email")
  }

   if (!passwordPattern.test(form.password)) {
   return toast.error("Weak Password");  
  }
  if (!contactPattern.test(form.contact)) {
  toast.error("Contact must be exactly 10 digits");
  return;
}
  seterrorName("")
  seterrorContact("")
  seterrorGender("")
  seterrorEmail("")
  seterrorImage("")
  seterrorPassword("")
  seterrorSkills("")
  
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          User Registration
        </h2>


        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        {errorName &&<p className="text-red-700 text-sm">{errorName}</p>}
       
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
         {errorEmail &&<p className="text-red-700 text-sm">{errorEmail}</p>}
       
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
         {errorPassword &&<p className="text-red-700 text-sm">{errorPassword}</p>}
       
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
         {errorContact &&<p className="text-red-700 text-sm">{errorContact}</p>}
       
        <div>
          <p className="font-medium text-gray-700 mb-1">Gender</p>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
              />{" "}
              Female
            </label>
          </div>
        </div>
        {errorGender &&<p className="text-red-700 font-sm">{errorGender}</p>}


        <div>
          <p className="font-medium text-gray-700 mb-1">Skills</p>
          <div className="flex gap-4">
            <label>
              <input type="checkbox" value="React" name="skills" onChange={handleChange} /> React
            </label>
            <label>
              <input type="checkbox" value="Node" name="skills" onChange={handleChange} /> Node
            </label>
            <label>
              <input type="checkbox" value="MongoDB" name="skills" onChange={handleChange} /> MongoDB
            </label>
          </div>
        </div>
         {errorSkills &&<p className="font-red-700 font-sm">{errorSkills}</p>}
       
        <div>
          <p className="font-medium text-gray-700 mb-1">Upload Image</p>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full"
          />
        </div>
          {errorImage &&<p className="text-red-700 text-sm">{errorImage}</p>}
       
        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;