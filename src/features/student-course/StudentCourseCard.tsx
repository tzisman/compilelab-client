// src/components/CourseCard/CourseCard.tsx
import React from 'react';
import styles from './StudentCourseCard.module.scss';
import type { StudentCourseDisplay } from '../../types/studentCourse.types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentCourseContext } from './courseSlice';

interface StudentCourseCardProps {
  course: StudentCourseDisplay;
}

const CourseCard: React.FC<StudentCourseCardProps> = ({ course }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleContinue = () => {
    dispatch(setCurrentCourseContext({ 
    inCourseId: course.id, 
    courseId: course.courseId 
  }));
    navigate(`/course/${course.courseId}`);
  };
  return (
    <div className={styles.card}>
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>{course.courseName}</h3>
        <button className={styles.editIcon}></button>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>lecturer</span>
          <span className={styles.statValue}>{course.courseLecturerName}</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>exercises</span>
          <span className={styles.statValue}>{course.courseExercisesCount}</span>
        </div>
      </div>

      <button className={styles.manageBtn} onClick={handleContinue}>
        continue learning
      </button>
    </div>
  );
};

export default CourseCard;