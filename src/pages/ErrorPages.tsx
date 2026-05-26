import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Compass, ServerCrash, WifiOff } from 'lucide-react';

const ErrorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-full h-screen bg-[#334148] flex items-start justify-center p-4 pt-20 sm:pt-28 font-sans select-none overflow-hidden">
    <div className="w-full max-w-md bg-white rounded-[1.8rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-8 md:p-10 flex flex-col items-center text-center max-h-[85vh] overflow-y-auto">
      {children}
    </div>
  </div>
);

export const NotFound = () => (
  <ErrorLayout>
    <div className="w-16 h-16 bg-cyan-50 text-cyan-500 rounded-full flex items-center justify-center mb-4 shrink-0">
      <Compass className="h-8 w-8 stroke-[1.5]" />
    </div>
    
    <span className="text-xs font-mono font-bold text-cyan-500 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
      Error 404
    </span>
    
    <h2 className="text-xl md:text-2xl font-bold text-[#334148] m-0 mb-2 capitalize">
      Page Not Found
    </h2>
    <p className="text-sm text-gray-400 font-sans leading-relaxed m-0 mb-6 max-w-xs">
      Oops! The page you are looking for doesn't exist, has been removed, or the link is broken.
    </p>
    
    <Button asChild className="bg-[#f5b813] hover:bg-[#e0a610] text-[#334148] font-bold text-xs h-10 px-8 rounded-xl shadow-sm transition-all border-none uppercase tracking-wider cursor-pointer">
      <Link to="/">Back to Home</Link>
    </Button>
  </ErrorLayout>
);

export const ServerError = () => (
  <ErrorLayout>
    <div className="w-16 h-16 bg-cyan-50 text-cyan-500 rounded-full flex items-center justify-center mb-4 shrink-0">
      <ServerCrash className="h-8 w-8 stroke-[1.5]" />
    </div>

    <span className="text-xs font-mono font-bold text-cyan-500 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
      Error 500
    </span>

    <h2 className="text-xl md:text-2xl font-bold text-[#334148] m-0 mb-2 capitalize">
      Internal Server Error
    </h2>
    <p className="text-sm text-gray-400 font-sans leading-relaxed m-0 mb-6 max-w-xs">
      Something went wrong on our end. Our development team is already working to fix it!
    </p>
    
    <Button asChild className="bg-[#f5b813] hover:bg-[#e0a610] text-[#334148] font-bold text-xs h-10 px-8 rounded-xl shadow-sm transition-all border-none uppercase tracking-wider cursor-pointer">
      <Link to="/">Try again later</Link>
    </Button>
  </ErrorLayout>
);

export const ServerDown = () => (
  <ErrorLayout>
    <div className="w-16 h-16 bg-cyan-50 text-cyan-500 rounded-full flex items-center justify-center mb-4 shrink-0">
      <WifiOff className="h-8 w-8 stroke-[1.5]" />
    </div>

    <span className="text-xs font-mono font-bold text-cyan-500 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
      Connection Error
    </span>

    <h2 className="text-xl md:text-2xl font-bold text-[#334148] m-0 mb-2 capitalize">
      Server Connection Lost
    </h2>
    <p className="text-sm text-gray-400 font-sans leading-relaxed m-0 mb-6 max-w-xs">
      We can't reach the system services right now. Please make sure your backend server is running.
    </p>
    
    <Button 
      onClick={() => window.location.reload()} 
      className="bg-[#f5b813] hover:bg-[#e0a610] text-[#334148] font-bold text-xs h-10 px-8 rounded-xl shadow-sm transition-all border-none uppercase tracking-wider cursor-pointer"
    >
      Retry Connection
    </Button>
  </ErrorLayout>
);