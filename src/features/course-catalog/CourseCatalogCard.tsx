// src/components/CourseCard/CourseCard.tsx
import React from 'react';
import styles from './CourseCatalogCard.module.scss';
import type { CourseCatalog } from '../../types/courseCatalog.types';

interface CourseCatalogCardProps {
  course: CourseCatalog;
}

const CourseCatalogCard: React.FC<CourseCatalogCardProps> = ({ course }) => {
 

  return (
    <div className={styles.card}>
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>{course.name}</h3>
        <button className={styles.editIcon}></button>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Lecturer</span>
          <span className={styles.statValue}>{course.lecturerName}</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Exercises</span>
          <span className={styles.statValue}>{course.exercisesCount}</span>
        </div>
      </div>

      <button className={styles.manageBtn} >Join This Course</button>
    </div>
  );
};

export default CourseCatalogCard;