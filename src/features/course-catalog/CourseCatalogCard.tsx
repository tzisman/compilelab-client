import React, { useState } from 'react';
import type { CourseCatalog } from '../../types/courseCatalog.types';
import JoinCourseModal from './JoinCourseModal';
import { useJoinToCourseMutation } from './courseCatalogApi';
import { useAppSelector } from '../../app/hooks';
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';
import * as Icons from 'lucide-react';

interface CourseCatalogCardProps {
  course: CourseCatalog;
}

// Complete icons pool matching the teacher card system
const iconsPool = [
  Icons.Code, Icons.Cpu, Icons.Layers, Icons.Terminal, Icons.Globe, Icons.Award, Icons.Binary, Icons.Database, 
  Icons.Braces, Icons.FolderCode, Icons.FileCode, Icons.Laptop, Icons.Monitor, Icons.Network, Icons.Server, 
  Icons.Shield, Icons.Smartphone, Icons.Tablet, Icons.Tv, Icons.Wifi, Icons.Zap, Icons.Boxes, Icons.Component, 
  Icons.Grid, Icons.Key, Icons.Link, Icons.Lock, Icons.Sliders, Icons.SlidersHorizontal, Icons.Activity, 
  Icons.Atom, Icons.Book, Icons.BookOpen, Icons.Bookmark, Icons.Brain, Icons.Briefcase, Icons.Calculator, 
  Icons.Calendar, Icons.CheckCircle, Icons.ChevronRight, Icons.Clipboard, Icons.Compass, Icons.CornerDownRight, 
  Icons.Eye, Icons.Feather, Icons.Flag, Icons.Folder, Icons.GraduationCap, Icons.Hash, Icons.HelpCircle, 
  Icons.Inbox, Icons.Info, Icons.Lightbulb, Icons.List, Icons.Map, Icons.MessageSquare, Icons.MousePointer, 
  Icons.Package, Icons.Paperclip, Icons.PenTool, Icons.PieChart, Icons.Play, Icons.Plus, Icons.Radio, 
  Icons.Rocket, Icons.Route, Icons.Search, Icons.Settings, Icons.Share2, Icons.Sparkles, Icons.Star, 
  Icons.Target, Icons.TrendingUp, Icons.User, Icons.Users, Icons.Video, Icons.Wand2, 
  Icons.Wrench, Icons.FileText, Icons.Command, Icons.HardDrive, Icons.Workflow, Icons.GitBranch, 
  Icons.GitCommit, Icons.GitMerge, Icons.GitPullRequest, Icons.Hexagon, Icons.Puzzle, Icons.SquareCode, 
  Icons.Blocks, Icons.Webhook, Icons.Bot, Icons.Fingerprint, Icons.KeyRound, Icons.Microscope, Icons.Presentation, 
  Icons.QrCode, Icons.Sigma, Icons.Variable, Icons.Spline
];

const CourseCatalogCard: React.FC<CourseCatalogCardProps> = ({ course }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [joinCourse] = useJoinToCourseMutation();
  const lecturerId = useAppSelector((state) => state.auth.user?.id);

  const handleJoinSubmit = async (data: { message: string }) => {
    if (!lecturerId) {
        alert("User session expired. Please log in again.");
        return;
    }

    try {
      await joinCourse({ id: 0, userId: lecturerId, courseId: course.id, message: data.message }).unwrap();
      setIsModalOpen(false);
      alert('Request sent successfully!');
    } catch (err) {
      alert('Failed to join course: ' + err);
    }
  };

  // Select icon component using the identical modulo arithmetic strategy
  const IconComponent = iconsPool[course.id % iconsPool.length] || Icons.Code;

  return (
    <>
      <div className="bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-[240px] w-[300px] relative group shrink-0">
        
        <div className="flex justify-between items-start w-full gap-3">
          <div className="flex flex-col min-w-0 flex-1">
            <div className="h-14 flex items-start">
              <h3 className="text-xl font-extrabold text-[#334148] tracking-tight capitalize m-0 font-sans group-hover:text-cyan-500 transition-colors line-clamp-2 overflow-hidden text-ellipsis">
                {course.name}
              </h3>
            </div>
          </div>
          
          {/* Circular dashed container holding the dynamic icon pool component */}
          <div className="p-2.5 rounded-full bg-transparent text-cyan-500 border border-dashed border-cyan-400 shrink-0 flex items-center justify-center">
            <IconComponent className="h-5 w-5 stroke-[1.5]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 my-2 py-3 border-y border-gray-50 text-xs font-mono w-full shrink-0">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 shrink-0">
              <User className="h-3 w-3" /> lecturer
            </span>
            <span className="text-gray-700 font-sans font-semibold truncate block w-full">{course.lecturerName}</span>
          </div>
          <div className="flex flex-col gap-1 pl-4 border-l border-gray-100 shrink-0">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">exercises</span>
            <span className="text-gray-900 font-bold text-sm">{course.exercisesCount}</span>
          </div>
        </div>

        <div className="w-full flex justify-center shrink-0">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#f5b813] hover:bg-[#e0a610] text-[#334148] font-bold text-xs tracking-wide py-2 px-6 h-auto rounded-full shadow-sm transition-all capitalize cursor-pointer border-none"
          >
            Join This Course
          </Button>
        </div>
      </div>

      <JoinCourseModal 
        course={course}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleJoinSubmit}
      />
    </>
  );
};

export default CourseCatalogCard;