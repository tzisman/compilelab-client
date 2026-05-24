import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { closeAlert } from './alertSlice';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

const CustomAlert = () => {
  const dispatch = useDispatch();
  
  const { isOpen, message, type } = useSelector((state: RootState) => state.alert);

  if (!isOpen) return null;

  // התאמת אייקונים ועיצובים לפי סוג האלרט
  const typeConfig = {
    success: {
      icon: <CheckCircle className="h-7 w-7 text-emerald-500" />,
      title: 'Success',
      badgeBg: 'bg-emerald-50 text-emerald-600',
    },
    error: {
      icon: <AlertTriangle className="h-7 w-7 text-rose-500" />,
      title: 'Error',
      badgeBg: 'bg-rose-50 text-rose-600',
    },
    info: {
      icon: <Info className="h-7 w-7 text-cyan-500" />,
      title: 'Notification',
      badgeBg: 'bg-cyan-50 text-cyan-600',
    },
  };

  const currentType = typeConfig[type];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 select-none font-sans animate-in fade-in duration-200">
      {/* רקע מעומעם עם טשטוש עדין */}
      <div className="absolute inset-0 bg-[#334148]/40 backdrop-blur-sm" onClick={() => dispatch(closeAlert())} />

      {/* קופסת האלרט הלבנה והמעוגלת בסגנון COMPILE LAB */}
      <div className="relative w-full max-w-sm bg-white rounded-[1.8rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 flex flex-col items-center text-center max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        
        {/* כפתור X לסגירה מהירה */}
        <button 
          onClick={() => dispatch(closeAlert())}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-none p-0 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* האייקון המרכזי */}
        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-3 shrink-0">
          {currentType.icon}
        </div>

        {/* תגית הסוג */}
        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2 ${currentType.badgeBg}`}>
          {currentType.title}
        </span>

        {/* הודעת האלרט */}
        <p className="text-sm font-medium text-[#334148] leading-relaxed m-0 mb-5 max-w-xs whitespace-pre-line">
          {message}
        </p>

        {/* כפתור סגירה צהוב-מוזהב */}
        <Button 
          onClick={() => dispatch(closeAlert())}
          className="bg-[#f5b813] hover:bg-[#e0a610] text-[#334148] font-bold text-xs h-9 px-8 rounded-xl shadow-sm transition-all border-none w-full cursor-pointer uppercase tracking-wider"
        >
          Got it
        </Button>
      </div>
    </div>
  );
};

export default CustomAlert;