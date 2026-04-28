import React, { useState } from 'react';
import type { Exercise } from '../../types/exercise.types';
import { useAddTestCaseMutation } from './exerciseApi';
import styles from './ExerciseCard.module.scss';

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const [addTestCase, { isLoading: isAdding }] = useAddTestCaseMutation();
  
  const [newInput, setNewInput] = useState('');
  const [newOutput, setNewOutput] = useState('');

  const handleAddTest = async () => {
    if (!newInput || !newOutput) return;
    try {
      await addTestCase({
        exerciseId: exercise.id,
        input: newInput,
        output: newOutput
      }).unwrap();
      
      setNewInput('');
      setNewOutput('');
    } catch  {
      alert('Failed to add test case');
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{exercise.exerciseName}</h3>
        <span className={styles.count}>{exercise.testCases.length} Tests</span>
      </div>

      <div className={styles.testCaseList}>
        <h4>Test Cases:</h4>
        {exercise.testCases.length === 0 ? (
          <p className={styles.empty}>No test cases yet.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Input</th>
                <th>Expected Output</th>
              </tr>
            </thead>
            <tbody>
              {exercise.testCases.map((tc) => (
                <tr key={tc.id}>
                  <td><code>{tc.input}</code></td>
                  <td><code>{tc.output}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className={styles.addForm}>
        <h4>Add New Test Case</h4>
        <div className={styles.inputs}>
          <input 
            placeholder="Input" 
            value={newInput} 
            onChange={(e) => setNewInput(e.target.value)} 
          />
          <input 
            placeholder="Expected Output" 
            value={newOutput} 
            onChange={(e) => setNewOutput(e.target.value)} 
          />
          <button onClick={handleAddTest} disabled={isAdding}>
            {isAdding ? '...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;