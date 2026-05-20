import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetStudentExercisesQuery } from '../features/student-exercise/studentExerciseApi';
import StudentExerciseItem from '../features/student-exercise/StudentExerciseItem';

const StudentExerciseList: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const { 
    data: exercises, 
    isLoading, 
    error 
  } = useGetStudentExercisesQuery(Number(courseId));

  const handleEnterExercise = (exerciseId: number) => {
    navigate(`/exercise/${exerciseId}`);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#f8f9fa] flex items-center justify-center font-sans">
        <div className="text-xl font-bold text-gray-600 animate-pulse">Loading exercises...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-[#f8f9fa] flex items-center justify-center font-sans">
        <div className="text-xl font-bold text-red-500">Failed to load exercises. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] font-sans select-none overflow-x-hidden m-0 p-0 text-left flex flex-col">
      
      {/* HERO HEADER */}
      <div className="w-full bg-[#334148] text-white pt-10 pb-20 md:pt-14 md:pb-24 px-6 md:px-12 relative border-none flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 shrink-0">
        
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-0 w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-[#f5b813] tracking-wide uppercase m-0 leading-none">
            Exercises
          </h1>
          
          <div className="hidden sm:flex items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mx-4 md:mx-6 shrink-0" />
            <p className="text-sm md:text-base text-gray-300 font-medium tracking-wide m-0 leading-none">
              Review your course curriculum and tasks progress.
            </p>
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mx-4 md:mx-6 shrink-0" />
          </div>
        </div>

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
      <div className="w-full flex-grow px-4 sm:px-6 md:px-12 pb-24 pt-8 flex flex-col items-center gap-3 z-10">
        {exercises && exercises.length > 0 ? (
          exercises.map((ex) => (
            <StudentExerciseItem 
              key={ex.id} 
              exercise={ex} 
              onEnter={handleEnterExercise} 
            />
          ))
        ) : (
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-100 p-12 flex flex-col items-center text-center justify-center mx-auto mt-12">
            <h2 className="text-xl font-bold text-[#334148] mb-2">No Exercises Found</h2>
            <p className="text-gray-400 text-sm max-w-sm m-0">There are no tasks published for this course at the moment.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default StudentExerciseList;