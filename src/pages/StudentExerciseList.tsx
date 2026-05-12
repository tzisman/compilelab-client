import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetStudentExercisesQuery } from '../features/student-exercise/studentExerciseApi';
import StudentExerciseItem from '../features/student-exercise/StudentExerciseItem';
import styles from './StudentExerciseList.module.scss';

const StudentExerciseList: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const { 
    data: exercises, 
    isLoading, 
    error 
  } = useGetStudentExercisesQuery(Number(courseId));

  const handleEnterExercise = (exerciseId: number) => {
    navigate(`/exercise/${exerciseId}`);
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading exercises...</div>;
  }

  if (error) {
    return <div className={styles.error}>Failed to load exercises. Please try again.</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.listHeader}>
        <h1 className={styles.pageTitle}>Course Exercises</h1>
        <p className={styles.subtitle}>Complete the tasks below to improve your skills</p>
      </header>

      <div className={styles.exercisesWrapper}>
        {exercises && exercises.length > 0 ? (
          exercises.map((ex) => (
            <StudentExerciseItem 
              key={ex.id} 
              exercise={ex} 
              onEnter={handleEnterExercise} 
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <h3>No exercises found for this course yet.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentExerciseList;