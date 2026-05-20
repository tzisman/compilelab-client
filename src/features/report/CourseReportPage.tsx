import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCourseGradesReportQuery } from './reportApi';
import { ArrowLeft, Download, Users } from 'lucide-react';
import * as XLSX from 'xlsx';

const CourseReportPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const numericCourseId = Number(courseId);

  const { data: report, isLoading, error } = useGetCourseGradesReportQuery(numericCourseId);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#f8f9fa] flex items-center justify-center font-mono text-gray-500 animate-pulse">
        Loading report data...
      </div>
    );
  }

  if (error || !report || report.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#f8f9fa] flex items-center justify-center font-sans text-gray-500">
        <div className="text-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-sm">
          <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="font-bold text-[#334148]">No Data Available</p>
          <p className="text-xs text-gray-400 mt-1">There are no registered students or grades for this course yet.</p>
        </div>
      </div>
    );
  }

  const exerciseHeaders = report[0].exercises.map(ex => ex.exerciseName);

  const getGradeStyle = (grade: number | null) => {
    if (grade === null) return 'bg-gray-50 text-gray-400 font-medium';
    if (grade < 60) return 'bg-red-50 text-red-700 font-bold';
    if (grade < 80) return 'bg-amber-50 text-amber-800 font-bold';
    return 'bg-green-50 text-green-700 font-bold';
  };

  const exportToExcel = () => {
    const excelData = report.map(student => {
      const row: { [key: string]: string | number } = {
        'Student Name': student.studentName
      };

      student.exercises.forEach(ex => {
        row[ex.exerciseName] = ex.grade ?? 'N/A';
      });

      const validGrades = student.exercises.filter(ex => ex.grade !== null);
      row['Average'] = validGrades.length > 0 
        ? Number((validGrades.reduce((sum, curr) => sum + (curr.grade || 0), 0) / validGrades.length).toFixed(1))
        : 'N/A';

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grades Report");
    
    const wscols = [{ wch: 25 }, ...exerciseHeaders.map(() => ({ wch: 15 })), { wch: 10 }];
    worksheet['!cols'] = wscols;
    XLSX.writeFile(workbook, `Course_Report_${courseId}.xlsx`);
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] font-sans flex flex-col select-none overflow-x-hidden">
      
      {/* Hero Header */}
      <div className="w-full bg-[#334148] text-white pt-10 pb-24 px-6 md:px-12 relative flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 shrink-0">
        
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <button 
            onClick={() => navigate(`/manage-course/${courseId}`)} 
            className="p-2 rounded-xl bg-gray-700/40 hover:bg-gray-700/70 text-gray-300 hover:text-white transition-all cursor-pointer"
            aria-label="Back to course management"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#f5b813] tracking-wide uppercase m-0 leading-none">
              Course Grades Report
            </h1>
            <p className="text-xs md:text-sm text-gray-400 font-sans mt-2 m-0">
              Overview of student performance and exercise completion
            </p>
          </div>
        </div>

        <button 
          onClick={exportToExcel}
          className="flex items-center gap-2 bg-[#f5b813] text-[#334148] font-bold px-5 py-2 rounded-xl text-sm tracking-wide shadow-md hover:bg-[#e0a610] transition-all cursor-pointer w-full sm:w-auto justify-center"
        >
          <Download className="h-4 w-4 stroke-[2.5]" /> Export to Excel
        </button>

        {/* Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] -mb-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[45px] sm:h-[60px] md:h-[75px] text-[#f8f9fa] fill-current">
            <path d="M0,60 C100,10 140,110 240,60 C340,10 380,110 480,60 C580,10 620,110 720,60 C820,10 860,110 960,60 C1060,10 1120,110 1200,60 L1200,125 L0,125 Z" />
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pb-24 pt-12 z-10">
        
        {/* Accessible Table Wrapper */}
        <div 
          className="w-full overflow-x-auto border border-gray-100 rounded-[2rem] bg-white shadow-sm"
          role="region" 
          aria-label="Course grades data table"
          tabIndex={0}
        >
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 font-mono text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold sticky left-0 bg-gray-50 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.02)] min-w-[200px]">Student Name</th>
                {exerciseHeaders.map((name, index) => (
                  <th key={index} className="p-5 font-bold text-center min-w-[140px] whitespace-nowrap">{name}</th>
                ))}
                <th className="p-5 font-bold text-center bg-gray-50 min-w-[100px]">Average</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs font-mono text-gray-700">
              {report.map((student) => {
                const validGrades = student.exercises.filter(ex => ex.grade !== null);
                const avg = validGrades.length > 0 
                  ? (validGrades.reduce((sum, curr) => sum + (curr.grade || 0), 0) / validGrades.length).toFixed(1)
                  : '-';

                return (
                  <tr key={student.studentId} className="hover:bg-gray-50/40 transition-colors">
                    {/* Sticky Student Name Column */}
                    <td className="p-5 font-sans font-bold text-gray-900 sticky left-0 bg-white z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                      {student.studentName}
                    </td>
                    
                    {/* Exercise Grades Columns */}
                    {student.exercises.map((ex, idx) => (
                      <td key={idx} className="p-3 text-center">
                        <span className={`inline-block px-3 py-1.5 rounded-xl w-14 text-center ${getGradeStyle(ex.grade)}`}>
                          {ex.grade ?? '-'}
                        </span>
                      </td>
                    ))}
                    
                    {/* Average Column */}
                    <td className="p-5 text-center font-bold text-gray-900 bg-gray-50/30">
                      {avg}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default CourseReportPage;