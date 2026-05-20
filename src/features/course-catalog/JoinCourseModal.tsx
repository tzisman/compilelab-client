import React from 'react';
import { useForm } from 'react-hook-form';
import type { CourseCatalog } from '../../types/courseCatalog.types';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface JoinCourseModalProps {
  course: CourseCatalog;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { message: string }) => void;
}

const JoinCourseModal: React.FC<JoinCourseModalProps> = ({ course, isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ message: string }>();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[450px] bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8 shadow-lg select-none">
        
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-extrabold text-[#334148] font-sans m-0 capitalize">
            Join Course: {course.name}
          </DialogTitle>
          <DialogDescription className="text-xs font-sans text-gray-400 mt-1.5 m-0">
            Please enter a message to the lecturer, <span className="text-gray-700 font-medium">{course.lecturerName}</span>:
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="flex flex-col gap-1">
            <textarea
              {...register('message', { 
                required: 'Message is required', 
                minLength: { value: 10, message: 'Minimum 10 characters required' } 
              })}
              placeholder="Type your message here..."
              className="w-full min-h-[120px] p-4 text-xs font-sans bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:bg-white transition-all resize-none text-gray-800 placeholder-gray-400"
            />
            {errors.message && (
              <span className="text-[11px] font-mono font-bold text-red-500 pl-1">
                {errors.message.message}
              </span>
            )}
          </div>

          <DialogFooter className="flex flex-row items-center justify-end gap-3 pt-2">
            <Button 
              type="button" 
              onClick={onClose} 
              className="bg-transparent hover:bg-gray-50 text-gray-500 font-bold text-xs px-5 py-2 h-auto rounded-full transition-all border border-gray-100"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#f5b813] hover:bg-[#e0a610] text-[#334148] font-bold text-xs px-5 py-2 h-auto rounded-full shadow-sm transition-all border-none"
            >
              Send Request
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  );
};

export default JoinCourseModal;