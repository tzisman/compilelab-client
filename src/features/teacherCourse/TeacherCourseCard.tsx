import React from 'react';
import  type { Course } from '../../types/teacherCourse.types.ts';
import styles from './CourseCard.module.scss';

interface CourseCardProps {
  course: Course;
}

const TeacherCourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{course.name}</h3>
      
      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Studies</span>
          <span className={styles.statValue}>{course.studiesCount}</span>
        </div>
        
        <div className={styles.divider} />
        
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Exercises</span>
          <span className={styles.statValue}>{course.exercisesCount}</span>
        </div>
      </div>

      <button className={styles.manageBtn}>Manage Course</button>
    </div>
  );
};

export default TeacherCourseCard;