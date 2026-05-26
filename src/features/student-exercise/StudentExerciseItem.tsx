import React from 'react';
import type { StudentExercise } from '../../types/studentExercise.types';
import { Button } from "@/components/ui/button";

interface StudentExerciseItemProps {
  exercise: StudentExercise;
  onEnter: (id: number) => void;
}

const StudentExerciseItem: React.FC<StudentExerciseItemProps> = ({ exercise, onEnter }) => {
  const hasGrade = exercise.grade !== null && exercise.grade !== undefined;
  
  const progressPercentage = hasGrade ? Math.min(Math.max(exercise.grade!, 0), 100) : 0;

  return (
    <div className="w-full max-w-4xl bg-white rounded-[1.8rem] shadow-[0_12px_30px_rgba(0,0,0,0.04)] border border-gray-100/70 p-6 md:p-8 flex flex-col items-center text-center sm:grid sm:grid-cols-3 sm:items-center sm:text-left gap-6 hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)] transition-all group">
      
      <div className="flex flex-col items-center sm:items-start gap-2 min-w-0 w-full">
        <h4 className="text-xl md:text-2xl font-bold text-cyan-500 tracking-wide m-0 font-sans truncate w-full">
          {exercise.name}
        </h4>
        <span className="text-[11px] font-sans text-gray-500 bg-gray-100 px-3 py-0.5 rounded-full capitalize">
          {exercise.programmingLanguage || 'code'}
        </span>
      </div>

      <div className="flex justify-center w-full">
        <Button 
          onClick={() => onEnter(exercise.id)}
          className="bg-[#f5b813] hover:bg-[#e0a610] text-[#334148] font-medium text-sm px-8 py-2 h-auto rounded-full shadow-sm transition-all border-none font-sans lowercase cursor-pointer"
        >
          {hasGrade ? 'view solution' : 'solve now'}
        </Button>
      </div>

      <div className="flex flex-col items-center sm:items-end gap-2 w-full min-w-[160px] font-sans">
        <span className="text-xl font-bold tracking-wide m-0 leading-none text-cyan-500 font-sans">
          Mark: {hasGrade ? exercise.grade : '--'}
        </span>
        
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-1 max-w-[200px] sm:max-w-none">
          <div 
            className="h-full bg-cyan-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

    </div>
  );
};

export default StudentExerciseItem;