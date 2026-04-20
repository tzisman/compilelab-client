import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetExercisesByCourseQuery } from '../features/teacherCourse/teacherCourseApi';
import styles from './TeacherCourseManagement.module.scss';

const TeacherCourseManagementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);

  const [viewMode, setViewMode] = useState<'students' | 'exercises'>('exercises');

  const { data: exercises, isLoading, error } = useGetExercisesByCourseQuery(courseId);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Course Management</h1>
        <div className={styles.toggleGroup}>
          <button 
            className={viewMode === 'students' ? styles.active : ''} 
            onClick={() => setViewMode('students')}
            disabled 
          >
            By Students
          </button>
          <button 
            className={viewMode === 'exercises' ? styles.active : ''}
            onClick={() => setViewMode('exercises')}
          >
            By Exercises
          </button>
        </div>
      </header>

      <div className={styles.content}>
        {isLoading && <p>Loading exercises...</p>}
        {error && <p className={styles.error}>Error loading data</p>}

        {viewMode === 'exercises' && (
          <div className={styles.exerciseList}>
            {exercises?.length === 0 ? (
              <p>No exercises found for this course.</p>
            ) : (
              exercises?.map((exercise) => (
                <div key={exercise.id} className={styles.exerciseCard}>
                  <div className={styles.info}>
                    <h3>{exercise.exerciseName}</h3>
                    
                  </div>
                  <button className={styles.viewGradesBtn}>View Grades</button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCourseManagementPage;