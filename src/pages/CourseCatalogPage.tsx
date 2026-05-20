import React, { useState } from 'react';
import CourseCatalogCard from '../features/course-catalog/CourseCatalogCard';
import { useGetCourseCatalogQuery } from '../features/course-catalog/courseCatalogApi';
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, BookX } from 'lucide-react';

const CourseCatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: allCourses, error, isLoading, isFetching } = useGetCourseCatalogQuery({
    page: page,
    size: pageSize,
    search: searchTerm
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#f8f9fa] flex items-center justify-center font-sans">
        <div className="text-xl font-bold text-gray-600 animate-pulse">Loading Catalog...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-[#f8f9fa] flex items-center justify-center font-sans">
        <div className="text-xl font-bold text-red-500">Failed to load catalog. Please try again later.</div>
      </div>
    );
  }

  const hasCourses = allCourses && allCourses.length > 0;

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] font-sans select-none overflow-x-hidden m-0 p-0 text-left flex flex-col">
      
      {/* HERO HEADER */}
      <div className="w-full bg-[#334148] text-white pt-10 pb-20 md:pt-14 md:pb-24 px-6 md:px-12 relative border-none flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 shrink-0">
        
        {/* Responsive layout: row on large screens, stacked on mobile */}
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-0">
          <h1 className="text-3xl md:text-4xl font-bold text-[#f5b813] tracking-wide uppercase m-0 leading-none">
            Catalog
          </h1>
          
          <div className="hidden sm:flex items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mx-4 md:mx-6 shrink-0" />
            <p className="text-sm md:text-base text-gray-300 font-medium tracking-wide m-0 leading-none">
              Explore and request access to new academic courses.
            </p>
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mx-4 md:mx-6 shrink-0" />
          </div>
        </div>

        {/* Dynamic Search Box */}
        <div className="relative w-full max-w-xs z-10 mx-auto md:mx-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full pl-11 pr-4 py-2 bg-gray-700/40 text-sm border border-gray-600/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5b813]/60 focus:bg-gray-700/70 transition-all font-sans"
          />
        </div>

        {/* WAVE EFFECT */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] -mb-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] md:h-[75px] text-[#f8f9fa] fill-current">
            <path d="M0,60 C100,10 140,110 240,60 C340,10 380,110 480,60 C580,10 620,110 720,60 C820,10 860,110 960,60 C1060,10 1120,110 1200,60 L1200,125 L0,125 Z" />
          </svg>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="w-full flex-grow px-4 sm:px-6 md:px-12 pb-24 flex flex-col items-center">
        
        {isFetching && (
          <p className="text-xs font-mono font-bold text-cyan-500 animate-pulse mb-2 mt-4">
            Updating results...
          </p>
        )}

        {!hasCourses ? (
          <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-16 flex flex-col items-center text-center justify-center mx-auto mt-12">
            <div className="w-20 h-20 rounded-full bg-[#f1f3f4] flex items-center justify-center mb-6 text-gray-400">
              <BookX className="h-10 w-10 stroke-[1.3]" />
            </div>
            <h2 className="text-2xl font-bold text-[#334148] mb-3">No Courses Found</h2>
            <p className="text-gray-500 text-base max-w-sm">We couldn't find any courses matching your search. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            {/* Catalog Grid layout */}
            <div className="w-full pt-10 sm:pt-12 grid grid-cols-[repeat(auto-fit,300px)] gap-6 justify-center items-start">
              {allCourses.map((course) => (
                <CourseCatalogCard key={course.id} course={course} />
              ))}
            </div>

            {/* Custom Pagination Buttons */}
            <div className="flex items-center gap-4 mt-16 bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm text-xs font-mono text-gray-500 font-bold">
              <Button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="bg-transparent hover:bg-gray-50 text-gray-600 disabled:opacity-40 p-1.5 h-auto rounded-full border-none shadow-none cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span>PAGE {page}</span>
              
              <Button
                disabled={allCourses.length < pageSize}
                onClick={() => setPage(p => p + 1)}
                className="bg-transparent hover:bg-gray-50 text-gray-600 disabled:opacity-40 p-1.5 h-auto rounded-full border-none shadow-none cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default CourseCatalogPage;