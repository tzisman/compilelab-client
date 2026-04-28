import React from 'react';
import { useForm } from 'react-hook-form';
import { ProgrammingLanguage, type CodeExercise} from '../../types/exercise.types';
import styles from './AddExerciseModal.module.scss';

interface Props {
  courseId: number;
  onClose: () => void;
  onSubmit: (data: Partial<CodeExercise>) => void;
  isLoading: boolean;
}

const AddExerciseModal: React.FC<Props> = ({ courseId, onClose, onSubmit, isLoading }) => {
  const { register, handleSubmit } = useForm<Partial<CodeExercise>>({
    defaultValues: { courseId, language: ProgrammingLanguage.CSharp }
  });

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Create New Exercise</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <label>Exercise Name</label>
            <input {...register('exerciseName', { required: true })} placeholder="e.g. Loops Basics" />
          </div>

          <div className={styles.field}>
            <label>Language</label>
            <select {...register('language')}>
              <option value={ProgrammingLanguage.CSharp}>C#</option>
              <option value={ProgrammingLanguage.Python}>Python</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Description (Optional)</label>
            <textarea {...register('description')} rows={3} />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} disabled={isLoading}>Cancel</button>
            <button type="submit" className={styles.primary} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExerciseModal;