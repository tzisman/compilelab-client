import React, { useState } from 'react'; 
import TeacherCourseCard from '../features/teacher-course/TeacherCourseCard';
import styles from './TeacherCourseList.module.scss';
import { useGetTeacherCoursesQuery } from '../features/teacher-course/teacherCourseApi.ts'; 
import AddTeacherCourseModal from '../features/teacher-course/AddTeacherCourseModal';
const TeacherCourseList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: courses, isLoading, error } = useGetTeacherCoursesQuery();

  if (isLoading) {
    return <div className={styles.loading}>Loading your courses...</div>;
  }

  if (error) {
    return <div className={styles.error}>Failed to load courses. Please try again later.</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Courses</h1>
        
        <button 
          className={styles.addBtn} 
          onClick={() => setIsModalOpen(true)}
        >
          + Create New Course
        </button>
      </header>

      {courses?.length === 0 ? (
        <div className={styles.emptyState}>
          <p>You haven't created any courses yet.</p>
          <span>Click the button above to start!</span>
        </div>
      ) : (
        <div className={styles.grid}>
          {courses?.map((course) => (
            <TeacherCourseCard key={course.id} course={course} />
            
          ))}
        </div>
      )}


      <AddTeacherCourseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};


export default TeacherCourseList;