import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store'; 
import { useGetStudentExerciseByIdQuery } from '../student-exercise/studentExerciseApi';
import { 
  useGetStudentAnswerByIdQuery, 
  useAddStudentAnswerMutation, 
  useUpdateStudentAnswerMutation,
  useGetStudentMarkMutation 
} from './studentAnswerApi';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Play, Info } from 'lucide-react';

const ExerciseWorkspace: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();
  const exId = Number(exerciseId);
  
  const userInCourseId = useSelector((state: RootState) => state.course.currentInCourseId);

  const { data: exercise, isLoading: isExLoading } = useGetStudentExerciseByIdQuery(exId);

  const { data: existingAnswer, isLoading: isAnsLoading } = useGetStudentAnswerByIdQuery(
    exercise?.studentAnswerId!, 
    { skip: !exercise?.studentAnswerId }
  );

  const [code, setCode] = useState('');
  const [addAnswer, { isLoading: isAdding }] = useAddStudentAnswerMutation();
  const [updateAnswer, { isLoading: isUpdating }] = useUpdateStudentAnswerMutation();
  const [getMark, { data: markData, isLoading: isMarking }] = useGetStudentMarkMutation();

  useEffect(() => {
    if (existingAnswer?.answerCode) {
      setCode(existingAnswer.answerCode);
    }
  }, [existingAnswer]);

  const displayGrade = markData ? markData.mark : exercise?.grade;
  const hasGrade = displayGrade !== null && displayGrade !== undefined;
  const progressPercentage = hasGrade ? Math.min(Math.max(displayGrade, 0), 100) : 0;

  const onSave = async () => {
    if (!exercise || !userInCourseId) return;
    
    const payload = { 
      exerciseId: exId, 
      answerCode: code, 
      userInCourseId: userInCourseId 
    };
    
    try {
      if (exercise.studentAnswerId) {
        await updateAnswer({ id: exercise.studentAnswerId, data: payload }).unwrap();
      } else {
        await addAnswer(payload).unwrap();
      }
      alert('Changes saved successfully!');
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  if (isExLoading || isAnsLoading) {
    return (
      <div className="w-full min-h-screen bg-[#f8f9fa] flex items-center justify-center font-sans">
        <div className="text-xl font-bold text-gray-600 animate-pulse">Loading workspace...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] font-sans flex flex-col m-0 p-0 overflow-x-hidden text-left select-none">
      
      {/* 1. TOP NAVBAR / BAR */}
      <div className="w-full bg-[#334148] text-white px-6 py-4 flex items-center justify-between border-none shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="text-gray-400 hover:text-white transition-colors p-1 bg-gray-800/40 rounded-full cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">
              {exercise?.programmingLanguage || 'code'}
            </span>
            <span className="text-sm font-semibold text-gray-400 font-mono">Workspace / {exercise?.name}</span>
          </div>
        </div>

        {/* תצוגת ציון נוכחית עליונה בטורקיז */}
        <div className="flex items-center gap-2 bg-gray-800/30 px-4 py-1.5 rounded-full border border-gray-700/50">
          <span className="text-xs text-gray-400 font-medium">Current Mark:</span>
          <span className="text-sm font-bold text-cyan-400">
            {exercise?.grade !== null && exercise?.grade !== undefined ? `${exercise.grade}/100` : '--'}
          </span>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className="w-full flex-grow flex flex-col lg:flex-row p-4 sm:p-6 gap-6 min-h-0">
        
        {/* צד שמאל: כרטיסייה אחת מאוחדת ומאורגנת להפליא */}
        <div className="w-full lg:w-[380px] shrink-0 flex flex-col">
          <div className="bg-white rounded-[1.8rem] shadow-[0_12px_30px_rgba(0,0,0,0.02)] border border-gray-100 p-6 flex flex-col h-full justify-between">
            
            {/* חלק עליון: פרטי המטלה והתיאור */}
            <div className="flex flex-col flex-grow">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h1 className="text-2xl font-bold text-[#334148] tracking-wide m-0 capitalize truncate">
                  {exercise?.name}
                </h1>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                  {exercise?.programmingLanguage || 'code'}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 font-sans leading-relaxed m-0 whitespace-pre-line bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 overflow-y-auto max-h-[320px]">
                {exercise?.description || 'No description provided for this challenge.'}
              </div>
            </div>

            {/* חלק תחתון: אזור הציון והפידבק - מופרד בקו עדין ומיושר בדיוק כמו שורות התרגילים */}
            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-4">
              {hasGrade ? (
                <div className="flex flex-col gap-3 font-sans w-full">
                  <div className="flex justify-between items-end w-full">
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                      Submission Result
                    </span>
                    <span className="text-xl font-bold text-cyan-500 tracking-wide m-0 leading-none">
                      Mark: {displayGrade}
                    </span>
                  </div>

                  {/* פס פרוגרס מדויק ואחיד לקו העיצובי */}
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-1">
                    <div 
                      className="h-full bg-cyan-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>

                  {/* הערת המרצה/מערכת אם קיימת */}
                  {markData?.remark && (
                    <div className="bg-cyan-50/20 rounded-xl p-3 border border-cyan-100/30 mt-1">
                      <span className="text-[9px] font-bold uppercase text-cyan-600 block mb-0.5 font-mono">Feedback:</span>
                      <p className="text-xs text-gray-600 m-0 leading-relaxed font-sans">{markData.remark}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3 py-2 text-gray-400 font-sans">
                  <Info className="h-4 w-4 text-gray-300 shrink-0" />
                  <p className="text-xs m-0 leading-normal">
                    Your solution has not been evaluated yet. Submit your code to receive a grade.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* צד ימין: עורך הקוד (IDE Workspace) - נשאר ללא שינוי כיוון שאהבת אותו */}
        <div className="flex-grow flex flex-col bg-white rounded-[1.8rem] shadow-[0_12px_30px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden min-h-[450px]">
          
          <div className="w-full bg-gray-50/70 border-b border-gray-100 px-6 py-3.5 flex flex-row items-center justify-between shrink-0 gap-4">
            <span className="text-xs text-gray-400 font-mono font-bold tracking-wider uppercase">
              Source Code Editor
            </span>

            <div className="flex items-center gap-3">
              <Button 
                onClick={onSave} 
                disabled={isAdding || isUpdating}
                className="bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-200 font-medium text-xs rounded-full px-4 h-9 shadow-none transition-all cursor-pointer"
              >
                <Save className="h-3.5 w-3.5 mr-1.5" />
                {isAdding || isUpdating ? 'Saving...' : 'Save Changes'}
              </Button>
              
              <Button 
                disabled={!exercise?.studentAnswerId || isMarking} 
                onClick={() => getMark(exercise?.studentAnswerId!)}
                className="bg-[#f5b813] hover:bg-[#e0a610] text-[#334148] font-bold text-xs rounded-full px-5 h-9 shadow-sm transition-all border-none cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 mr-1.5 fill-current" />
                {isMarking ? 'Checking...' : 'Submit for Review'}
              </Button>
            </div>
          </div>

          <div className="flex-grow relative w-full p-4 md:p-6 bg-[#fafafa]">
            <Textarea 
              value={code} 
              onChange={(e) => setCode(e.target.value)} 
              spellCheck={false}
              placeholder="// Write your solution here..."
              className="w-full h-full min-h-[380px] bg-transparent border-none focus-visible:ring-0 p-0 m-0 font-mono text-sm leading-relaxed text-gray-800 resize-none shadow-none"
              style={{ tabSize: 4 }}
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default ExerciseWorkspace;