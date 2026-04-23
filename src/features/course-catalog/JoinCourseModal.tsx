import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './JoinCourseModal.module.scss';
import type { CourseCatalog } from '../../types/courseCatalog.types';

interface JoinCourseModalProps {
  course: CourseCatalog;
  onClose: () => void;
  onSubmit: (data: { message: string }) => void;
}

const JoinCourseModal: React.FC<JoinCourseModalProps> = ({ course, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ message: string }>();

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Join Course: {course.name}</h2>
        <p>Please enter a message to the lecturer, {course.lecturerName}:</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Minimum 10 characters' } })}
            placeholder="Type your message here..."
            className={styles.textArea}
          />
          {errors.message && <span className={styles.error}>{errors.message.message}</span>}

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
            <button type="submit" className={styles.submitBtn}>Send Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinCourseModal;