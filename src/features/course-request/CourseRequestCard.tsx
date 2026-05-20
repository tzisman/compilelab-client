import React from 'react';
import { useHandleRequestMutation } from './courseRequestApi';
import type { CourseRequest } from '../../types/courseRequest.types';
import { X, Check } from 'lucide-react';

interface CourseRequestCardProps {
  request: CourseRequest;
}

const CourseRequestCard: React.FC<CourseRequestCardProps> = ({ request }) => {
  const [handleRequest, { isLoading: isUpdating }] = useHandleRequestMutation();

  const onProcess = async (status: 'approved' | 'rejected') => {
    try {
      await handleRequest({ requestId: request.id, status }).unwrap();
    } catch {
      alert(`Action failed: ${status}`);
    }
  };

  return (
    <div className="w-full max-w-[400px] bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 flex flex-col justify-between text-left h-[290px] shrink-0">
      
      {/* Top Header Row: Name & Course */}
      <div className="w-full flex justify-between items-baseline mb-1">
        {/* Student Name */}
        <span className="text-xl font-bold text-[#f5b813] tracking-wide truncate max-w-[50%]">
          {request.studentName}
        </span>
        
        {/* Course Name */}
        <span className="text-xl font-bold text-cyan-500 tracking-wide text-right truncate max-w-[50%]">
          {request.courseName}
        </span>
      </div>

      {/* Date Row (No Email) */}
      <div className="w-full flex justify-end text-xs font-semibold text-gray-400 mb-4">
        <span>{new Date(request.requestDate).toLocaleDateString('en-GB')}</span>
      </div>
      
      {/* MessageBox: Fixed height, top-to-bottom text, scrolls if more than 2 lines */}
      <div className="w-full bg-[#f1f3f4] rounded-lg p-4 h-[85px] max-h-[85px] overflow-y-auto text-left mb-5">
        <p className="text-gray-800 font-mono text-sm leading-normal m-0 p-0 text-left whitespace-pre-wrap break-words">
          {request.message || "hello i whant to join"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex justify-between items-center gap-4 mt-auto">
        
        {/* Reject Button */}
        <button 
          onClick={() => onProcess('rejected')}
          disabled={isUpdating}
          className="flex-1 flex items-center justify-center gap-1 bg-[#f5b813] hover:bg-[#e0a60f] text-white font-bold py-2 px-4 rounded-full shadow-sm transition-colors duration-150 disabled:opacity-50"
        >
          <span className="text-sm tracking-wide">Reject</span>
          <X className="h-4 w-4 stroke-[3]" />
        </button>

        {/* Accept Button */}
        <button 
          onClick={() => onProcess('approved')}
          disabled={isUpdating}
          className="flex-1 flex items-center justify-center gap-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full shadow-sm transition-colors duration-150 disabled:opacity-50"
          >
          <span className="text-sm tracking-wide">Accept</span>
          <Check className="h-4 w-4 stroke-[3]" />
        </button>

      </div>

    </div>
  );
};

export default CourseRequestCard;