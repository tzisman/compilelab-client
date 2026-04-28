import React, { useState } from 'react';
// 1. נוסיף את useNavigate לייבוא מ-react-router-dom
import { useParams, useNavigate } from 'react-router-dom';
import { useGetExercisesByCourseQuery, useAddExerciseMutation } from '../features/exercise/exerciseApi';
import AddExerciseModal from '../features/exercise/AddExerciseModal';
import styles from './TeacherCourseManagement.module.scss';
import type { CodeExercise } from '../types/exercise.types';
import ExerciseAccordionItem from '../features/exercise/ExerciseAccordionItem';

const TeacherCourseManagementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);
  
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: exercises, isLoading } = useGetExercisesByCourseQuery(courseId);
  const [addExercise, { isLoading: isAdding }] = useAddExerciseMutation();

  const handleCreateExercise = async (data: Partial<CodeExercise>) => {
    try {
      await addExercise(data).unwrap();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to create exercise", err);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Exercises Management</h1>
        
        <div className={styles.actionButtons}>
          <button 
            className={styles.reportBtn} 
            onClick={() => navigate(`/courses/${courseId}/report`)}
          >
            📊 View Grades Report
          </button>
          
          <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
            + New Exercise
          </button>
        </div>
      </header>

      {isLoading ? (
        <p>Loading exercises...</p>
      ) : (
        <div className={styles.exerciseList}>
          {exercises?.length === 0 ? (
            <p>No exercises found for this course.</p>
          ) : (
            exercises?.map((exercise) => (
              <ExerciseAccordionItem key={exercise.id} exercise={exercise} />
            ))
          )}
        </div>
      )}

      {isModalOpen && (
        <AddExerciseModal 
          courseId={courseId}
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreateExercise}
          isLoading={isAdding}
        />
      )}
    </div>
  );
};

export default TeacherCourseManagementPage;