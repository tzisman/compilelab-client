import React from 'react';
import { useGetPendingRequestsQuery } from '../features/course-request/courseRequestApi';
import CourseRequestCard from '../features/course-request/CourseRequestCard';
import { Inbox } from 'lucide-react';

const LecturerRequestsPage: React.FC = () => {
  const { data: requests, isLoading } = useGetPendingRequestsQuery();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#f8f9fa] flex items-center justify-center font-sans">
        <div className="text-xl font-bold text-gray-600 animate-pulse">Loading requests...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] font-sans select-none overflow-x-hidden m-0 p-0 text-left flex flex-col">
      
      {/* 1. HERO HEADER */}
      <div className="w-full bg-[#334148] text-white pt-14 pb-24 px-12 relative border-none flex justify-start shrink-0">
        <div className="w-full flex items-center justify-start text-left">
          {/* Title */}
          <h1 className="text-4xl font-bold text-[#f5b813] tracking-wide uppercase m-0 leading-none">
            Requests
          </h1>
          
          {/* Cyan Decorative Dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mx-6 self-center mt-1 shrink-0" />
          
          {/* Description */}
          <p className="text-base text-gray-300 font-medium tracking-wide self-center mt-1 m-0 leading-none">
            Requests to join your course appear here
          </p>
        </div>

        {/* --- PERFECT WAVE --- */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] -mb-[1px]">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="relative block w-full h-[60px] md:h-[75px] text-[#f8f9fa] fill-current"
          >
            <path d="M0,60 
                     C100,10 140,110 240,60 
                     C340,10 380,110 480,60 
                     C580,10 620,110 720,60 
                     C820,10 860,110 960,60 
                     C1060,10 1120,110 1200,60 
                     L1200,125 L0,125 Z">
            </path>
          </svg>
        </div>
      </div>

      {/* 2. REQUESTS CONTENT AREA */}
      <div className="w-full flex-grow px-12 pb-24 flex flex-col items-center justify-center">
        {requests?.length === 0 ? (
          
          /* Empty state container - perfectly centered vertically and horizontally */
          <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-16 flex flex-col items-center text-center justify-center my-auto transition-all">
            
            {/* Outline icon matching the site's graphic language */}
            <div className="w-20 h-20 rounded-full bg-[#f1f3f4] flex items-center justify-center mb-6 text-cyan-500">
              <Inbox className="h-10 w-10 stroke-[1.3]" />
            </div>
            
            {/* Message Titles */}
            <h2 className="text-2xl font-bold text-[#334148] mb-3 tracking-wide">
              Your Inbox is Empty
            </h2>
            
            <p className="text-gray-500 font-mono text-base max-w-sm leading-relaxed">
              No pending requests found. All caught up!
            </p>
          </div>

        ) : (
          /* Cards grid flow when requests exist */
          <div className="w-full pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-start items-start">
            {requests?.map(req => (
              <CourseRequestCard key={req.id} request={req} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default LecturerRequestsPage;