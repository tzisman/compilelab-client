import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store'; 
import { useGetStudentExerciseByIdQuery } from '../student-exercise/studentExerciseApi';
import { 
  useGetStudentAnswerByIdQuery, 
  useAddStudentAnswerMutation, 
  useUpdateStudentAnswerMutation,
  useGetStudentMarkMutation 
} from './studentAnswerApi';
import styles from './ExerciseWorkspace.module.scss';

const ExerciseWorkspace: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const exId = Number(exerciseId);
  
  const userInCourseId = useSelector((state: RootState) => state.course.currentInCourseId);

  const { data: exercise, isLoading: isExLoading } = useGetStudentExerciseByIdQuery(exId);

  const { data: existingAnswer, isLoading: isAnsLoading } = useGetStudentAnswerByIdQuery(
    exercise?.studentAnswerId!, 
    { skip: !exercise?.studentAnswerId }
  );

  const [code, setCode] = useState('');
  const [addAnswer, { isLoading: isAdding }] = useAddStudentAnswerMutation();
  const [updateAnswer, { isLoading: isUpdating }] = useUpdateStudentAnswerMutation();
  const [getMark, { data: markData, isLoading: isMarking }] = useGetStudentMarkMutation();

  useEffect(() => {
    if (existingAnswer?.answerCode) {
      setCode(existingAnswer.answerCode);
    }
  }, [existingAnswer]);

 
  const displayGrade = markData ? markData.mark : exercise?.grade;
  const hasGrade = displayGrade !== null && displayGrade !== undefined;

  
  const isPassing = hasGrade ? displayGrade >= 60 : false;

  const onSave = async () => {
    if (!exercise || !userInCourseId) return;
    
    const payload = { 
      exerciseId: exId, 
      answerCode: code, 
      userInCourseId: userInCourseId 
    };
    
    try {
      if (exercise.studentAnswerId) {
        await updateAnswer({ id: exercise.studentAnswerId, data: payload }).unwrap();
      } else {
        await addAnswer(payload).unwrap();
      }
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  if (isExLoading) return <div className={styles.loader}>Loading...</div>;

  return (
    <div className={styles.workspaceContainer}>
      <div className={styles.sidebar}>
        <h1 className={styles.title}>{exercise?.name}</h1>
        <div className={styles.description}>
          <p>{exercise?.description}</p>
        </div>
        
        
        {markData && (
          <div className={`${styles.markBox} ${markData.isSuccess ? styles.success : styles.fail}`}>
            <h4>Test Results:</h4>
            <p className={styles.grade}>Grade: {markData.mark}</p>
            {markData.remark && <p className={styles.remark}>{markData.remark}</p>}
          </div>
        )}
      </div>

      <div className={styles.editorArea}>
        <div className={styles.toolbar}>
          <div className={styles.leftTools}>
            <span className={styles.langBadge}>{exercise?.programmingLanguage}</span>
            
            
            <div className={`${styles.currentGradeBadge} ${hasGrade ? (isPassing ? styles.success : styles.fail) : ''}`}>
              Current Grade: <strong>{exercise?.grade !== null && exercise?.grade !== undefined ? exercise.grade : '--'}</strong>
            </div>
          </div>

          <div className={styles.buttons}>
            <button className={styles.saveBtn} onClick={onSave} disabled={isAdding || isUpdating}>
              {isAdding || isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              className={styles.markBtn} 
              disabled={!exercise?.studentAnswerId || isMarking} 
              onClick={() => getMark(exercise?.studentAnswerId!)}
            >
              {isMarking ? 'Checking...' : 'Submit for Review'}
            </button>
          </div>
        </div>

        <textarea 
          className={styles.editor}
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default ExerciseWorkspace;