// src/components/CourseCard/CourseCard.tsx
import React from 'react';
import styles from './StudentCourseCard.module.scss';
import type { StudentCourseDisplay } from '../../types/studentCourse.types';

interface StudentCourseCardProps {
  course: StudentCourseDisplay;
}

const CourseCard: React.FC<StudentCourseCardProps> = ({ course }) => {
  return (
    <div className={styles.card}>
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>{course.name}</h3>
        <button className={styles.editIcon}></button>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>lecturer</span>
          <span className={styles.statValue}>{course.lecturerName}</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>exercises</span>
          <span className={styles.statValue}>{course.exercisesCount}</span>
        </div>
      </div>

      <button className={styles.manageBtn}>continue learning</button>
    </div>
  );
};

export default CourseCard;