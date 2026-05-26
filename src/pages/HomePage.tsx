import { Monitor, NotebookPen, Users, Network, ClipboardCheck, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-white font-sans select-none overflow-x-hidden m-0 p-0">
      
      <div className="w-full bg-[#334148] text-white pt-20 pb-36 px-4 flex flex-col items-center text-center relative">
        
        <h1 className="text-3xl md:text-5xl font-bold text-[#f5b813] tracking-wide mb-5 uppercase">
          Welcome to compilelab!
        </h1>

        <div className="flex gap-4 mb-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          ))}
        </div>

        <p className="max-w-2xl text-base md:text-xl text-gray-200 font-medium leading-relaxed mb-12">
          The advanced platform for teachers and students to track and manage coding exercises
        </p>

        <div className="flex gap-16 justify-center items-center text-cyan-400 mb-2">
          <Monitor className="h-12 w-12 stroke-[1.5]" />
          <NotebookPen className="h-12 w-12 stroke-[1.5]" />
          <Users className="h-12 w-12 stroke-[1.5]" />
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] -mb-[1px]">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="relative block w-full h-[85px] md:h-[105px] text-white fill-current"
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


      <div className="w-full flex flex-col">


        <div className="w-full bg-white pt-32 pb-20 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            
            <div className="flex flex-col items-center text-center md:w-1/3">
              <Network className="h-24 w-24 text-black stroke-[1.1] mb-4" />
              <h3 className="text-2xl font-bold text-[#f5b813] tracking-wide leading-tight">
                Organized<br />Workflow
              </h3>
            </div>
            
            <div className="hidden md:block w-[2px] h-36 bg-cyan-400 self-center" />

            <div className="text-center md:text-left md:w-3/5 text-gray-700 text-base md:text-lg leading-relaxed font-medium">
              Courses and assignments are clearly structured, making it easy to manage tasks and follow progress. Both instructors and students always know what is required and what comes next.
            </div>
          </div>
        </div>

        <div className="w-full bg-[#f8f9fa] border-y border-gray-100 py-20 px-6">
          <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            
            <div className="text-center md:text-right md:w-3/5 text-gray-700 text-base md:text-lg leading-relaxed font-medium">
              Submitted code is tested automatically using predefined cases. Students receive fast feedback, while instructors save time on manual evaluation.
            </div>

            <div className="hidden md:block w-[2px] h-36 bg-cyan-400 self-center" />

            <div className="flex flex-col items-center text-center md:w-1/3">
              <ClipboardCheck className="h-24 w-24 text-cyan-500 stroke-[1.1] mb-4" />
              <h3 className="text-2xl font-bold text-[#f5b813] tracking-wide leading-tight">
                Automatic<br />Code Checking
              </h3>
            </div>
          </div>
        </div>

        <div className="w-full bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            
            <div className="flex flex-col items-center text-center md:w-1/3">
              <TrendingUp className="h-24 w-24 text-black stroke-[1.1] mb-4" />
              <h3 className="text-2xl font-bold text-[#f5b813] tracking-wide leading-tight">
                Progress<br />Overview
              </h3>
            </div>

            <div className="hidden md:block w-[2px] h-36 bg-cyan-400 self-center" />

            <div className="text-center md:text-left md:w-3/5 text-gray-700 text-base md:text-lg leading-relaxed font-medium">
              The platform provides clear summaries of student performance. Instructors can quickly see progress, results, and overall course status.
            </div>
          </div>
        </div>

      </div>

      <div className="h-16" />
    </div>
  );
};

export default Home;