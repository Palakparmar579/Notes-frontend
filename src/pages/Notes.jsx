import React, { useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import { FaTrash, FaArrowRight } from "react-icons/fa";
import { toast } from "react-hot-toast";
import ConfirmatiomPopup from '../components/ConfirmationPopup'
const Notes = () => {
  const navigate=useNavigate();
  const email = localStorage.getItem("email");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showLogPopup,setShowLogPopup]=useState(false)
  const [showDeletePopup,setShowDeletePopup]=useState(false)
  const [delIndex,setDelIndex]=useState(null)
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem(email)) || [];
    setNotes(savedNotes);
  }, [email]);

  
  const handleAddNote = () => {
    if (!title) return toast.error("Title is required");
    if (!description) return toast.error("Description is required");

    const newNotes = { title, description };
    const updatedNotes = [...notes, newNotes];

    localStorage.setItem(email, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    setTitle("");
    setDescription("");
  };

const handleDelete=(index)=>{
  setDelIndex(index)
  setShowDeletePopup(true)
}
console.log(delIndex)
  const handleDeleteConfirm = (delIndex) => {
    const updated = notes.filter((_, i) => i !== delIndex);
    setNotes(updated);
    localStorage.setItem(email, JSON.stringify(updated));
    toast.success("Note deleted");
    setShowDeletePopup(false)
  };
 const handleDeleteCross=()=>{
   setShowDeletePopup(false)
 }
  const handleDeleteCancel=()=>{
   setShowDeletePopup(false)
 }

const handleLogout=()=>{
  setShowLogPopup(true)
}
const handleLogCancel=()=>{
  setShowLogPopup(false)
}
const handleLogCross=()=>{
   setShowLogPopup(false)
}
  const handleLogConfirm=()=>{
    toast.success("Logged out Successfully")
    navigate("/login")
    setShowLogPopup(false)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-300">
{showLogPopup &&
    <ConfirmatiomPopup
    handleCancel={handleLogCancel}
    handleConfirm={handleLogConfirm}
    handleCross={handleLogCross}
    message="Are you sure you want to logout?"
    />
}
{showDeletePopup &&
    <ConfirmatiomPopup
    handleCancel={handleDeleteCancel}
     handleConfirm={() => handleDeleteConfirm(delIndex)}
    handleCross={handleDeleteCross}
    message="Are you sure you want to delete this note?"
    />
}
      <div className="flex justify-between items-center px-8 py-3 bg-white/60 backdrop-blur-xl shadow-md border-b border-white/40">
        <h1 className="text-lg font-bold text-gray-800 tracking-wide">🌊 NoteFlow</h1>
        <button
        onClick={handleLogout}
        className="text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1.5 rounded-lg shadow hover:shadow-lg hover:scale-105 transition">
          Logout
        </button>
      </div>

     
      <div className="max-w-5xl mx-auto p-4 space-y-4">
        <h3 className="text-black font-semibold text-xl italic">
          Welcome: <span className="text-base italic">{email}</span>
        </h3>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-white">
          <div className="grid md:grid-cols-3 gap-3 items-center">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title..."
              className="p-3 text-sm rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write something..."
              className="p-3 text-sm rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handleAddNote}
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white py-2 text-sm rounded-lg hover:scale-105 transition shadow-md"
            >
              ➕ Add
            </button>
          </div>
        </div>

       
        <h2 className="text-lg font-semibold text-gray-700 my-8">📚 Your Notes</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 mt-6">
              <p className="text-sm">No notes yet 🌊</p>
            </div>
          ) : (
            notes.map((item, index) => (
              <div
                key={index}
                className="relative bg-white/70 backdrop-blur-xl p-5 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between h-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30 opacity-0 hover:opacity-100 transition duration-300 rounded-2xl"></div>

                <div className="relative z-10">
                  <h3 className="font-semibold text-gray-800 text-lg truncate">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{item.description}</p>
                </div>

                <div className="relative z-10 flex justify-between items-center mt-5">
                  <button
                    onClick={() => setSelectedNote(item)} 
                    className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white transition duration-300"
                  >
                    See more <FaArrowRight size={10} />
                  </button>

                  <button
                    onClick={() => handleDelete(index)}
                    className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition duration-300"
                  >
                    <FaTrash size={10} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      
      {selectedNote && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full">
            <h3 className="text-lg font-semibold">{selectedNote.title}</h3>
            <p className="mt-3 text-gray-700">{selectedNote.description}</p>
            <button
              onClick={() => setSelectedNote(null)}
              className="mt-4 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;