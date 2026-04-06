import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Notes = () => {
  const email = localStorage.getItem("email") || [];

  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);

  // Load notes once
  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem(email)) || []);
  }, [email]);

  // Save notes
  useEffect(() => {
    localStorage.setItem(email, JSON.stringify(notes));
  }, [notes]);

  // Add Note
  const handleAddNote = () => {
    const value = noteInput.trim();

    if (!value) return toast.error("Note cannot be empty");
    if (notes.includes(value)) return toast.error("Note must be unique");

    setNotes([...notes, value]);
    setNoteInput("");
    toast.success("Note added");
  };

  // Delete Note
  const handleDelete = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
    toast.success("Note deleted");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold mb-2">Notes Page</h1>
        <p className="text-gray-600 mb-4">Welcome: {email}</p>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Write your note..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            onClick={handleAddNote}
            className="bg-gray-700 text-white px-4 rounded-lg hover:bg-gray-800"
          >
            Add
          </button>
        </div>

        {/* Notes List */}
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center">No notes yet</p>
        ) : (
          <ul className="space-y-3">
            {notes.map((note, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <span>{note}</span>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
};

export default Notes;