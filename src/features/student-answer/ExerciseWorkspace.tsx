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
  console.log("Exercise ID from URL:", exId);
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

  const onSave = async () => {
    if (!exercise || !userInCourseId) {
      alert("Missing course or exercise context. Please return to the course page.");
      return;
    }
    
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
      alert("Progress saved successfully!");
    } catch (err) {
      alert("Error saving progress.");
    }
  };

  if (isExLoading || isAnsLoading) return <div className={styles.loader}>Loading Workspace...</div>;

  return (
    <div className={styles.workspaceContainer}>
      <div className={styles.sidebar}>
        <h1 className={styles.title}>{exercise?.name}</h1>
        <div className={styles.description}>
          <h3>Exercise Description:</h3>
          <p>{exercise?.description}</p>
        </div>
        
       
        {markData && (
          <div className={`${styles.markBox} ${markData.isSuccess ? styles.success : styles.fail}`}>
            <h4>Test Results:</h4>
            <p className={styles.grade}>Grade: {markData.mark}</p>
            {markData.remark && <p className={styles.remark}>{markData.remark}</p>}
            {markData.errorMessage && <pre className={styles.errorLog}>{markData.errorMessage}</pre>}
          </div>
        )}
      </div>

      <div className={styles.editorArea}>
        <div className={styles.toolbar}>
          <span className={styles.langBadge}>{exercise?.programmingLanguage}</span>
          <div className={styles.buttons}>
            <button 
              className={styles.saveBtn} 
              onClick={onSave} 
              disabled={isAdding || isUpdating}
            >
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
          placeholder="// Your code here..."
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default ExerciseWorkspace;