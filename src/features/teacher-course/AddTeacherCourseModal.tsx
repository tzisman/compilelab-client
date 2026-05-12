import React, { useState } from 'react';
import { useAddTeacherCourseMutation } from './teacherCourseApi';
import styles from './AddTeacherCourseModal.module.scss';
import { useAppSelector } from '../../app/hooks';

interface AddTeacherCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTeacherCourseModal: React.FC<AddTeacherCourseModalProps> = ({ isOpen, onClose }) => {
  const [courseName, setCourseName] = useState('');
  const [addCourse, { isLoading }] = useAddTeacherCourseMutation();

  const lecturerId = useAppSelector((state) => state.auth.user?.id);
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseName.trim()) {
      alert("Please enter a course name");
      return;
    }

    if (!lecturerId) {
        alert("User session expired. Please log in again.");
        return;
    }

    try {
      await addCourse({ id: 0, name: courseName, lecturerId: lecturerId }).unwrap();
      
      setCourseName('');
      onClose();
    } catch (err) {
      console.error('Failed to add course:', err);
      alert("Error adding course. Please try again.");
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Create New Course</h2>
          <button className={styles.closeX} onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Course Name</label>
            <input
              id="name"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter course name..."
              autoFocus
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherCourseModal;