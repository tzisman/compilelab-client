import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCourseGradesReportQuery } from './reportApi';
import styles from './CourseReportPage.module.scss';
import * as XLSX from 'xlsx';



const CourseReportPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: report, isLoading, error } = useGetCourseGradesReportQuery(Number(courseId));

  if (isLoading) return <div className={styles.statusMsg}>Loading report data...</div>;
  if (error) return <div className={styles.statusMsgError}>Error loading report data</div>;
  if (!report || report.length === 0) return <div className={styles.statusMsg}>No data available for this course</div>;

  const exerciseHeaders = report[0].exercises.map(ex => ex.exerciseName);

  const getGradeClass = (grade: number | null) => {
    if (grade === null) return styles.gradeEmpty;
    if (grade < 60) return styles.gradeLow;
    if (grade < 80) return styles.gradeMid;
    return styles.gradeHigh;
  };

  // ... בתוך הקומפוננטה CourseReportPage
const exportToExcel = () => {
  if (!report || report.length === 0) return;

  // 1. הכנת הנתונים למבנה של אקסל
  const excelData = report.map(student => {
    const row: { [key: string]: string | number } = {
      'Student Name': student.studentName
    };

    student.exercises.forEach(ex => {
      row[ex.exerciseName] = ex.grade ?? 'N/A';
    });

    const validGrades = student.exercises.filter(ex => ex.grade !== null);
    row['Average'] = validGrades.length > 0 
      ? (validGrades.reduce((sum, curr) => sum + (curr.grade || 0), 0) / validGrades.length).toFixed(1)
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
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div>
          <h1>Course Grades Report</h1>
          <p className={styles.subtitle}>Overview of student performance and exercise completion</p>
        </div>
        <button className={styles.exportBtn} onClick={exportToExcel}>
          <span className={styles.icon}>📥</span> Export to Excel
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.gradesTable}>
          <thead>
            <tr>
              <th className={styles.stickyCol}>Student Name</th>
              {exerciseHeaders.map((name, index) => (
                <th key={index} className={styles.exerciseHeader}>{name}</th>
              ))}
              <th className={styles.avgHeader}>Average</th>
            </tr>
          </thead>
          <tbody>
            {report.map((student) => {
              const validGrades = student.exercises.filter(ex => ex.grade !== null);
              const avg = validGrades.length > 0 
                ? (validGrades.reduce((sum, curr) => sum + (curr.grade || 0), 0) / validGrades.length).toFixed(1)
                : 'N/A';

              return (
                <tr key={student.studentId}>
                  <td className={styles.stickyCol}>
                    <div className={styles.studentName}>{student.studentName}</div>
                  </td>
                  {student.exercises.map((ex, idx) => (
                    <td key={idx} className={getGradeClass(ex.grade)}>
                      <span className={styles.gradeValue}>{ex.grade ?? '-'}</span>
                    </td>
                  ))}
                  <td className={styles.avgCell}>{avg}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseReportPage;