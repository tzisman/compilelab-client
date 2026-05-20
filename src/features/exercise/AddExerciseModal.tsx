import React from 'react';
import { useForm } from 'react-hook-form';
import { ProgrammingLanguage, type CodeExercise} from '../../types/exercise.types';
import { X } from 'lucide-react';

interface Props {
  courseId: number;
  onClose: () => void;
  onSubmit: (data: Partial<CodeExercise>) => void;
  isLoading: boolean;
}

const AddExerciseModal: React.FC<Props> = ({ courseId, onClose, onSubmit, isLoading }) => {
  const { register, handleSubmit } = useForm<Partial<CodeExercise>>({
    defaultValues: { courseId, language: ProgrammingLanguage.CSharp }
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#334148]/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl border border-gray-50 p-8 flex flex-col relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* כפתור סגירה מהיר */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="font-mono text-2xl font-bold text-cyan-500 tracking-wide mb-6">
          Create New Exercise
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          
          {/* שדה שם התרגיל */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="font-mono text-xs font-bold text-gray-900 uppercase">Exercise Name</label>
            <input 
              {...register('exerciseName', { required: true })} 
              className="w-full bg-[#f8f9fa] border border-gray-100 rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="e.g. Loops Basics" 
            />
          </div>

          {/* שדה שפת תכנות */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="font-mono text-xs font-bold text-gray-900 uppercase">Language</label>
            <div className="relative w-full">
              <select 
                {...register('language')}
                className="w-full bg-[#f8f9fa] border border-gray-100 rounded-xl px-4 py-2.5 font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors appearance-none cursor-pointer"
              >
                <option value={ProgrammingLanguage.CSharp}>C#</option>
                <option value={ProgrammingLanguage.Python}>Python</option>
              </select>
            </div>
          </div>

          {/* שדה תיאור */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="font-mono text-xs font-bold text-gray-900 uppercase">Description (Optional)</label>
            <textarea 
              {...register('description')} 
              rows={3} 
              className="w-full bg-[#f8f9fa] border border-gray-100 rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              placeholder="Provide context or instructions..."
            />
          </div>

          {/* כפתורי פעולה */}
          <div className="flex justify-end gap-3 mt-4 font-mono text-sm">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={isLoading}
              className="px-5 py-2 rounded-xl text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              CANCEL
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-[#f5b813] text-white font-bold px-6 py-2 rounded-xl hover:bg-[#e0a610] shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'CREATING...' : 'CREATE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExerciseModal;