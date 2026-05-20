import React, { useState } from 'react'; 
import type { Course } from '../../types/teacherCourse.types.ts';
import { useNavigate } from 'react-router-dom'; 
import { useAppSelector } from '../../app/hooks'; 
import { useUpdateTeacherCourseMutation } from './teacherCourseApi.ts';
import { Pencil } from 'lucide-react';
import * as Icons from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

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

const TeacherCourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(course.name);

  const lecturerId = useAppSelector((state) => state.auth.user?.id);
  const [updateCourse, { isLoading }] = useUpdateTeacherCourseMutation();

  const IconComponent = iconsPool[course.id % iconsPool.length] || Icons.Code;

  const handleUpdate = async () => {
    if (!newName.trim()) return alert("Please enter a course name");
    if (!lecturerId) return alert("User session expired. Please log in again.");

    try {
      await updateCourse({ id: course.id, name: newName, lecturerId }).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update:", err);
      alert("Error updating the course name");
    }
  };

  return (
    <div className="w-[300px] bg-white rounded-[2.5rem] shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-gray-50 p-8 flex flex-col items-center transition-all hover:scale-[1.03] hover:shadow-[0_25px_45px_rgba(0,0,0,0.1)]">
      
      {/* Dynamic Icon Wrapper */}
      <div className="w-16 h-16 rounded-full bg-[#f8f9fa] border-2 border-dashed border-cyan-400 flex items-center justify-center mb-4 text-[#334148]">
        <IconComponent className="h-7 w-7 stroke-[1.5]" />
      </div>

      {/* Course Title Section */}
      {isEditing ? (
        <div className="w-full flex flex-col items-center gap-2 mb-4">
          <input 
            className="w-full text-center border-b border-cyan-400 font-mono text-cyan-600 focus:outline-none pb-1 bg-transparent"
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
            autoFocus
          />
          {/* כפתורי שמירה וביטול מעודכנים לצבעי המותג האחידים */}
          <div className="flex gap-4 text-xs font-bold mt-1 font-mono">
            <button 
              onClick={handleUpdate} 
              disabled={isLoading} 
              className="text-cyan-500 hover:text-cyan-600 transition-colors cursor-pointer"
            >
              {isLoading ? '...' : 'SAVE'}
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className="text-gray-400 hover:text-gray-500 transition-colors cursor-pointer"
            >
              CANCEL
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 mb-6 group w-full px-2">
          <h3 className="font-mono text-xl font-bold text-cyan-500 tracking-wide text-center truncate">
            {course.name}
          </h3>
          <button 
            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-cyan-500 transition-all cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Statistics Block */}
      <div className="w-full flex flex-col gap-3 font-mono text-sm mb-8 px-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">students</span>
          <span className="text-gray-500">{course.studiesCount || 0}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">Exercises</span>
          <span className="text-gray-500">{course.exercisesCount || 0}</span>
        </div>
      </div>

      {/* Open Button */}
      {!isEditing && (
        <button 
          className="bg-[#f5b813] text-white font-mono text-sm px-8 py-1.5 rounded-full hover:bg-[#e0a610] shadow-sm transition-all mt-auto cursor-pointer"
          onClick={() => navigate(`/manage-course/${course.id}`)}
        >
          open
        </button>
      )}
    </div>
  );
};

export default TeacherCourseCard;