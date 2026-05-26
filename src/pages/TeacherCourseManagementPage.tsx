import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetExercisesByCourseQuery, useAddExerciseMutation } from '../features/exercise/exerciseApi';
import { useGetTeacherCoursesQuery } from '../features/teacher-course/teacherCourseApi.ts'; 
import AddExerciseModal from '../features/exercise/AddExerciseModal';
import type { CodeExercise } from '../types/exercise.types';
import ExerciseAccordionItem from '../features/exercise/ExerciseAccordionItem';
import { BarChart3, Plus, ArrowLeft, FolderCode } from 'lucide-react';

const TeacherCourseManagementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: courses } = useGetTeacherCoursesQuery();
  const currentCourse = courses?.find(c => c.id === courseId);

  const { data: exercises, isLoading } = useGetExercisesByCourseQuery(courseId);
  const [addExercise, { isLoading: isAdding }] = useAddExerciseMutation();

  const handleCreateExercise = async (data: Partial<CodeExercise>) => {
    try {
      await addExercise(data).unwrap();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to create exercise", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] font-sans flex flex-col select-none overflow-x-hidden">
      
      {/* Hero Header */}
      <div className="w-full bg-[#334148] text-white pt-10 pb-24 px-6 md:px-12 relative flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 shrink-0">
        
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <button 
            onClick={() => navigate('/instructors')} 
            className="p-2 rounded-xl bg-gray-700/40 hover:bg-gray-700/70 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#f5b813] tracking-wide uppercase m-0 leading-none">
              Exercises Management
            </h1>
            <p className="text-sm md:text-base text-cyan-400 font-mono font-bold mt-2.5 m-0 capitalize tracking-wide">
              course: {currentCourse ? currentCourse.name : 'Loading course...'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
          <button 
            className="flex items-center gap-2 bg-transparent border border-gray-500 hover:border-gray-300 text-gray-300 hover:text-white font-bold px-5 py-2 rounded-xl text-sm tracking-wide transition-all cursor-pointer"
            onClick={() => navigate(`/courses/${courseId}/report`)}
          >
            <BarChart3 className="h-4 w-4" /> Report
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#f5b813] text-[#334148] font-bold px-5 py-2 rounded-xl text-sm tracking-wide shadow-md hover:bg-[#e0a610] transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4 stroke-[3]" /> Add
          </button>
        </div>

        {/* Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] -mb-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[45px] sm:h-[60px] md:h-[75px] text-[#f8f9fa] fill-current">
            <path d="M0,60 C100,10 140,110 240,60 C340,10 380,110 480,60 C580,10 620,110 720,60 C820,10 860,110 960,60 C1060,10 1120,110 1200,60 L1200,125 L0,125 Z" />
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-24 pt-12 z-10">
        {isLoading ? (
          <div className="text-center font-mono text-gray-500 animate-pulse mt-12">Loading exercises...</div>
        ) : (
          <div className="flex flex-col gap-4">
            {exercises?.length === 0 ? (
              <div className="w-full bg-white rounded-[2.5rem] border border-gray-100 p-16 flex flex-col items-center text-center shadow-sm">
                <FolderCode className="h-12 w-12 text-cyan-400 mb-4 stroke-[1.5]" />
                <h3 className="text-lg font-bold text-[#334148] mb-1">No Exercises Yet</h3>
                <p className="text-gray-400 text-sm max-w-xs">Get started by creating your very first practice exercise for this course.</p>
              </div>
            ) : (
              exercises?.map((exercise) => (
                <ExerciseAccordionItem key={exercise.id} exercise={exercise} />
              ))
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <AddExerciseModal 
          courseId={courseId}
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreateExercise}
          isLoading={isAdding}
        />
      )}
    </div>
  );
};

export default TeacherCourseManagementPage;