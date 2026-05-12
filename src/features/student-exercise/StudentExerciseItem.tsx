import React from 'react';
import styles from './StudentExerciseItem.module.scss';
import type { StudentExercise } from '../../types/studentExercise.types';

interface StudentExerciseItemProps {
  exercise: StudentExercise;
  onEnter: (id: number | null) => void;
}

const StudentExerciseItem: React.FC<StudentExerciseItemProps> = ({ exercise, onEnter }) => {
  const hasGrade = exercise.grade !== null && exercise.grade !== undefined;

  return (
    <div className={styles.exerciseRow}>
      <div className={styles.infoSection}>
        <h4 className={styles.title}>{exercise.name}</h4>
        <p className={styles.description}>{exercise.description}</p>
      </div>

      <div>{exercise.studentAnswerId}</div>

      <div className={styles.detailsSection}>
        <span className={styles.languageBadge}>
          {exercise.programmingLanguage}
        </span>
        
        <div className={styles.gradeBox}>
          <span className={styles.gradeLabel}>Grade</span>
          <span className={`${styles.gradeValue} ${hasGrade && exercise.grade! >= 60 ? styles.pass : styles.fail}`}>
            {hasGrade ? `${exercise.grade}` : '--'}
          </span>
        </div>
      </div>

      <button 
        className={styles.actionBtn} 
        onClick={() => onEnter(exercise.id)}
      >
        {hasGrade ? 'View Solution' : 'Solve Now'}
      </button>
    </div>
  );
};

export default StudentExerciseItem;