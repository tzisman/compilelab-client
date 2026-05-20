import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice'; 
import type { RootState } from '../../app/store'; 
import { apiSlice } from '../../api/apiSlice';
import { LogOut } from 'lucide-react';

const Footer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // משיכת מצב המשתמש לסנכרון מלא
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    navigate('/login'); 
  };

  // רשימת הניווט הרשמית של המערכת
  const navItems = [
    { label: 'Studies', path: '/studies' },
    { label: 'Instruction', path: '/instructors' },
    { label: 'Requests', path: '/requests' },
  ];

  return (
    // הפיכת הפס העליון ל-border-t-2 עם גוון מעט יותר נוכח
    <footer className="w-full bg-[#334148] text-white border-t-2 border-gray-600/50 select-none font-sans shrink-0 mt-auto">
      
      {/* אזור התוכן המרכזי */}
      <div className="w-full max-w-7xl mx-auto px-6 py-10 md:py-12 grid grid-cols-1 md:grid-cols-3 items-start md:items-center justify-between gap-8 text-center md:text-left">
        
        {/* עמודה 1: לוגו COMPILE LAB והסבר קצר */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-1 text-xl font-semibold tracking-wide">
            <Link to="/" className="flex items-center gap-1.5 bg-transparent p-0 border-none outline-none">
              <span className="text-gray-300 font-medium">COMPILE</span>
              <span className="text-cyan-400 font-bold">LAB</span>
              <div className="bg-[#f5b813] text-[#334148] text-[10px] font-black px-1.5 py-0.5 rounded-[4px] ml-0.5 flex items-center justify-center">
                &lt;/&gt;
              </div>
            </Link>
          </div>
          <p className="text-xs text-gray-400 font-medium tracking-wide m-0 max-w-xs leading-relaxed">
            Advanced interactive workspace environment for code review, training tracking, and automated exercise grading.
          </p>
        </div>

        {/* עמודה 2: קישורים מהירים מסונכרנים עם ה-Navbar */}
        <div className="flex justify-center w-full">
          <div className="flex items-center flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-gray-300 font-mono tracking-wide">
            {navItems.map((item) => (
              <React.Fragment key={item.path}>
                <Link to={item.path} className="hover:text-cyan-400 transition-colors uppercase">
                  {item.label}
                </Link>
                <span className="text-gray-600 last:hidden">|</span>
              </React.Fragment>
            ))}
            
            {/* הצגת קישורי התחברות דינמיים לפי מצב ה-Auth */}
            {!user ? (
              <>
                <Link to="/login" className="hover:text-cyan-400 transition-colors uppercase">Login</Link>
                <span className="text-gray-600">|</span>
                <Link to="/signup" className="hover:text-cyan-400 transition-colors uppercase">Sign Up</Link>
              </>
            ) : (
              <>
                <button 
                  onClick={handleLogout}
                  className="hover:text-red-400 transition-colors uppercase bg-transparent border-none p-0 cursor-pointer font-semibold font-mono flex items-center gap-1"
                >
                  <LogOut className="h-3 w-3" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* עמודה 3: זכויות יוצרים ופיתוח */}
        <div className="flex flex-col items-center md:items-end gap-1 w-full text-xs text-gray-400 md:text-right font-sans">
          <span className="font-medium">
            &copy; {currentYear} <span className="text-cyan-400 font-bold">CompileLab</span>.
          </span>
          <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">
            Automated Training Platform
          </span>
        </div>

      </div>

      {/* פס העיטור התחתון בצהוב מוזהב */}
      <div className="w-full h-1 bg-[#f5b813]/80" />
      
    </footer>
  );
};

export default Footer;