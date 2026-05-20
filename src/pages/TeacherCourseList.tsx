import React, { useState } from 'react'; 
import TeacherCourseCard from '../features/teacher-course/TeacherCourseCard';
import { useGetTeacherCoursesQuery } from '../features/teacher-course/teacherCourseApi.ts'; 
import AddTeacherCourseModal from '../features/teacher-course/AddTeacherCourseModal';
import { BookOpen } from 'lucide-react';

const TeacherCourseList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: courses, isLoading, error } = useGetTeacherCoursesQuery();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#f8f9fa] flex items-center justify-center font-sans">
        <div className="text-xl font-bold text-gray-600 animate-pulse">Loading your courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-[#f8f9fa] flex items-center justify-center font-sans">
        <div className="text-xl font-bold text-red-500">Failed to load courses. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] font-sans select-none overflow-x-hidden m-0 p-0 text-left flex flex-col">
      
      {/* HERO HEADER */}
      <div className="w-full bg-[#334148] text-white pt-10 pb-20 md:pt-14 md:pb-24 px-6 md:px-12 relative border-none flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 shrink-0">
        
        {/* כותרת וטקסט נלווה */}
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-0">
          <h1 className="text-3xl md:text-4xl font-bold text-[#f5b813] tracking-wide uppercase m-0 leading-none">
            Instruction
          </h1>
          
          <div className="hidden sm:flex items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mx-4 md:mx-6 shrink-0" />
            <p className="text-sm md:text-base text-gray-300 font-medium tracking-wide m-0 leading-none">
              The courses you are teach.
            </p>
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mx-4 md:mx-6 shrink-0" />
          </div>
        </div>

        {/* כפתור הוספה מעודכן - קומפקטי ושומר על גודל קבוע (w-fit) */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#f5b813] text-[#334148] font-bold px-6 py-2 rounded-xl text-sm tracking-wide shadow-md hover:bg-[#e0a610] transition-all cursor-pointer z-10 w-fit mx-auto md:mx-0"
        >
          add
        </button>

        {/* WAVE EFFECT */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] -mb-[1px]">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="relative block w-full h-[40px] sm:h-[60px] md:h-[75px] text-[#f8f9fa] fill-current"
          >
            <path d="M0,60 C100,10 140,110 240,60 C340,10 380,110 480,60 C580,10 620,110 720,60 C820,10 860,110 960,60 C1060,10 1120,110 1200,60 L1200,125 L0,125 Z" />
          </svg>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="w-full flex-grow px-4 sm:px-6 md:px-12 pb-24 flex justify-center">
        {courses?.length === 0 ? (
          <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-16 flex flex-col items-center text-center justify-center mx-auto mt-20">
            <div className="w-20 h-20 rounded-full bg-[#f1f3f4] flex items-center justify-center mb-6 text-cyan-500">
              <BookOpen className="h-10 w-10 stroke-[1.3]" />
            </div>
            <h2 className="text-2xl font-bold text-[#334148] mb-3">No Courses Found</h2>
            <p className="text-gray-500 text-base max-w-sm">You haven't created any courses yet. Click the add button above to start!</p>
          </div>
        ) : (
          <div className="w-full pt-10 sm:pt-12 grid grid-cols-[repeat(auto-fit,300px)] gap-6 justify-center items-start">
            {courses?.map((course) => (
              <TeacherCourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      <AddTeacherCourseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default TeacherCourseList;