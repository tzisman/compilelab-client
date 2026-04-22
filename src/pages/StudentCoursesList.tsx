import React from 'react';
import CourseCard from '../features/studentCourse/StudentCourseCard';
import { useGetStudentCoursesQuery } from '../features/studentCourse/StudentCourseApi';
import styles from './StudentCourseList.module.scss';
import { useNavigate } from 'react-router-dom';

const StudentCoursesList: React.FC = () => {
    const navigate = useNavigate();

     const handleJoinClick = () => {
    navigate('/course-catalog'); 
  };

  const { data: courses, error, isLoading } = useGetStudentCoursesQuery();

  if (isLoading) {
    return <div className={styles.container}>Loading courses...</div>;
  }
  
  if (error) {
    return <div className={styles.container}>Error loading courses. Please try again later.</div>;
  }

  const isEmpty = !courses || courses.length === 0;

  return (
    <div className={styles.container}>
      {/* Header section with Title and Action Button */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>My Courses</h1>
        <button className={styles.createBtn} onClick={handleJoinClick}>Join a new course</button>
      </div>

      {isEmpty ? (
        /* Empty State following the design in the image */
        <div className={styles.emptyStateContainer}>
          <h2 className={styles.emptyTitle}>You haven't created any courses yet.</h2>
          <p className={styles.emptySubtitle}>Click the button above to start!</p>
        </div>
      ) : (
        /* Grid of Courses */
        <div className={styles.coursesGrid}>
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCoursesList;