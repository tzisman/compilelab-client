import React, { useState } from 'react';
import { useAddTeacherCourseMutation } from './teacherCourseApi';
import { useAppSelector } from '../../app/hooks';
import { X } from 'lucide-react';

interface AddTeacherCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTeacherCourseModal: React.FC<AddTeacherCourseModalProps> = ({ isOpen, onClose }) => {
  const [courseName, setCourseName] = useState('');
  const [addCourse, { isLoading }] = useAddTeacherCourseMutation();
  const lecturerId = useAppSelector((state) => state.auth.user?.id);
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName.trim()) return alert("Please enter a course name");
    if (!lecturerId) return alert("User session expired. Please log in again.");

    try {
      await addCourse({ id: 0, name: courseName, lecturerId }).unwrap();
      setCourseName('');
      onClose();
    } catch (err) {
      console.error('Failed to add course:', err);
      alert("Error adding course. Please try again.");
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-all"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#334148] font-sans">
            Create New Course
          </h2>
          <p className="text-sm text-gray-400 font-mono mt-1">Set up a new workspace for your students</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-bold text-gray-700 font-mono">
              Course Name
            </label>
            <input
              id="name"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="e.g. Machine Learning, Advanced C++..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-cyan-400 font-mono text-gray-700 placeholder-gray-300 transition-all shadow-inner bg-gray-50/50"
              autoFocus
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2.5 rounded-xl text-sm font-bold font-sans text-gray-500 hover:bg-gray-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-[#334148] text-white hover:bg-[#253036] disabled:bg-gray-300 px-6 py-2.5 rounded-xl text-sm font-bold font-sans tracking-wide shadow-md transition-all cursor-pointer"
            >
              {isLoading ? 'Creating...' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherCourseModal;