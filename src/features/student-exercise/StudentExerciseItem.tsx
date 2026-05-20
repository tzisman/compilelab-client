import React from 'react';
import type { StudentExercise } from '../../types/studentExercise.types';
import { Button } from "@/components/ui/button";
import { Code, CheckCircle2, CircleDot, Terminal } from 'lucide-react';

interface StudentExerciseItemProps {
  exercise: StudentExercise;
  onEnter: (id: number) => void;
}

const StudentExerciseItem: React.FC<StudentExerciseItemProps> = ({ exercise, onEnter }) => {
  const hasGrade = exercise.grade !== null && exercise.grade !== undefined;
  const isPass = hasGrade && exercise.grade! >= 60;

  // פונקציה לבחירת צבע הבר התחתון לפי הציון או מצב ההגשה
  const getProgressColor = () => {
    if (!hasGrade) return 'bg-gray-200'; // טרם הוגש / נבדק
    return isPass ? 'bg-[#f5b813]' : 'bg-red-400'; // עובר (צהוב מותג) או נכשל
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-all group relative overflow-hidden">
      
      {/* שמאל: פרטי התרגיל והשפה */}
      <div className="flex items-start gap-4 flex-1 min-w-0 w-full sm:w-auto">
        <div className="p-3 rounded-2xl bg-gray-50 text-[#334148] group-hover:text-cyan-500 transition-colors shrink-0">
          {exercise.programmingLanguage?.toLowerCase().includes('html') ? (
            <Code className="h-5 w-5" />
          ) : (
            <Terminal className="h-5 w-5" />
          )}
        </div>
        
        <div className="flex flex-col min-w-0 gap-1">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-extrabold text-[#334148] font-sans m-0 capitalize truncate">
              {exercise.name}
            </h4>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-cyan-50 text-cyan-600 rounded-md">
              {exercise.programmingLanguage || 'Code'}
            </span>
          </div>
          <p className="text-xs font-sans text-gray-400 m-0 line-clamp-1">
            {exercise.description || 'No description provided for this task.'}
          </p>
        </div>
      </div>

      {/* ימין: מצג הציון ופס ההתקדמות לפי ה-Mockup */}
      <div className="flex flex-col items-end gap-2 shrink-0 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-50">
        <div className="flex justify-between sm:justify-end items-center w-full gap-8">
          
          {/* בלוק הציון בעיצוב נקי */}
          <div className="flex flex-col items-start sm:items-end font-sans">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
              {hasGrade ? 'Mark Obtained' : 'Status'}
            </span>
            <span className={`text-base font-extrabold m-0 leading-none ${hasGrade ? (isPass ? 'text-gray-900' : 'text-red-500') : 'text-gray-400'}`}>
              {hasGrade ? `Mark: ${exercise.grade}/100` : 'Not Submitted'}
            </span>
          </div>

          {/* כפתור פעולה מותאם */}
          <Button 
            onClick={() => onEnter(exercise.id)}
            className="bg-[#f5b813] hover:bg-[#e0a610] text-[#334148] font-bold text-xs tracking-wide py-2 px-6 h-auto rounded-full shadow-sm transition-all capitalize border-none"
          >
            {hasGrade ? 'View Solution' : 'Solve Now'}
          </Button>
        </div>

        {/* בר פרוגרס דק מתחת לנתונים כמו בציור */}
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-1">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: hasGrade ? `${Math.max(exercise.grade!, 15)}%` : '100%' }}
          />
        </div>
      </div>

    </div>
  );
};

export default StudentExerciseItem;