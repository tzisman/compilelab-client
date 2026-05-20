import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice'; 
import type { RootState } from '../../app/store'; 
import { apiSlice } from '../../api/apiSlice';
import { Menu, LogOut } from 'lucide-react'; // Icons for mobile menu

// shadcn/ui components imports
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    navigate('/login'); 
  };

  const isActive = (path: string) => location.pathname === path;

  // Desktop link styles with smooth transitions
  const desktopLinkStyles = (path: string) => `
    h-full px-6 flex items-center border-b-4 font-medium
    transition-all duration-300 ease-in-out text-gray-700 hover:text-black
    ${isActive(path) 
      ? 'bg-gray-100 border-cyan-500 text-black' 
      : 'border-transparent hover:bg-gray-50'}
  `;

  // Mobile link styles with smooth transitions
  const mobileLinkStyles = (path: string) => `
    w-full p-4 flex items-center rounded-lg font-medium text-lg
    transition-all duration-200 ease-in-out
    ${isActive(path) 
      ? 'bg-cyan-50 text-cyan-600 font-semibold' 
      : 'text-gray-700 hover:bg-gray-50'}
  `;

  const navItems = [
    { label: 'Studies', path: '/studies' },
    { label: 'Instruction', path: '/instructors' },
    { label: 'Requests', path: '/requests' },
  ];

  return (
    /* השינוי המרכזי כאן בשורה למטה:
      הוספנו fixed top-0 left-0 z-50 כדי לקבע אותו, ו-shadow-sm בשביל צל עדין בגלילה 
    */
    <nav className="fixed top-0 left-0 z-50 w-full h-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 md:px-8 select-none font-sans transition-all duration-300">
      
      {/* LEFT SIDE: CompileLab Logo */}
      <div className="flex items-center gap-1 text-xl font-semibold tracking-wide">
        <Link to="/" className="flex items-center gap-1.5">
          <span className="text-gray-600">COMPILE</span>
          <span className="text-cyan-500">LAB</span>
          <div className="bg-[#f5b813] text-white text-xs font-bold px-1.5 py-1 rounded-[4px] ml-0.5 flex items-center justify-center transition-transform duration-300 hover:scale-105">
            &lt;/&gt;
          </div>
        </Link>
      </div>

      {/* RIGHT SIDE (DESKTOP): Navigation Links & User Menu */}
      <div className="hidden md:flex items-center h-full gap-4">
        <ul className="flex items-center h-full list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.path} className="h-full">
              <Link to={item.path} className={desktopLinkStyles(item.path)}>{item.label}</Link>
            </li>
          ))}
          
          {!user && (
            <>
              <li className="h-full">
                <Link to="/login" className={desktopLinkStyles('/login')}>Login</Link>
              </li>
              <li className="h-full">
                <Link to="/signup" className={desktopLinkStyles('/signup')}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>

        {/* User Profile Dropdown */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none cursor-pointer">
              <Avatar className="h-10 w-10 border-0 bg-[#f5b813] hover:opacity-90 transition-all duration-300 ease-in-out">
                <AvatarFallback className="bg-[#f5b813] text-white text-lg font-medium uppercase">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 mt-1 font-sans data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-50 data-[state=open]:slide-in-from-top-2 duration-200">
              <DropdownMenuLabel className="text-left text-gray-500 font-normal">Hello, {user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-left text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200">
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* RIGHT SIDE (MOBILE): Hamburger Menu & Sheet */}
      <div className="flex md:hidden items-center gap-4">
        {user && (
          <Avatar className="h-9 w-9 border-0 bg-[#f5b813]">
            <AvatarFallback className="bg-[#f5b813] text-white text-base font-medium uppercase">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}

        <Sheet>
          <SheetTrigger className="p-2 text-gray-600 hover:text-black cursor-pointer outline-none transition-colors duration-200">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 pt-12 font-sans flex flex-col justify-between transition-transform duration-300 ease-in-out">
            <div className="flex flex-col gap-6">
              <SheetTitle className="text-left text-gray-400 text-sm font-normal tracking-wider uppercase px-4">
                {user ? `Hello, ${user.name}` : "Navigation"}
              </SheetTitle>
              
              <ul className="flex flex-col gap-1 list-none m-0 p-0 w-full">
                {navItems.map((item) => (
                  <li key={item.path} className="w-full">
                    <Link to={item.path} className={mobileLinkStyles(item.path)}>{item.label}</Link>
                  </li>
                ))}
                
                {!user && (
                  <>
                    <div className="h-[1px] bg-gray-100 my-2" />
                    <li className="w-full">
                      <Link to="/login" className={mobileLinkStyles('/login')}>Login</Link>
                    </li>
                    <li className="w-full">
                      <Link to="/signup" className={mobileLinkStyles('/signup')}>Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Logout button at the bottom of mobile drawer */}
            {user && (
              <button 
                onClick={handleLogout} 
                className="w-full mt-auto p-4 flex items-center gap-3 text-destructive hover:bg-destructive/5 rounded-lg transition-all duration-200 font-medium text-lg text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            )}
          </SheetContent>
        </Sheet>
      </div>

    </nav>
  );
};

export default Navbar;