import React, { useState } from 'react';
import type { CodeExercise, TestCase } from '../../types/exercise.types';
import { 
    useLazyGetTestCasesByExerciseQuery,
    useDeleteTestCaseMutation,
    useAddTestCaseMutation,
    useUpdateTestCaseMutation 
} from './exerciseApi';
import styles from './ExerciseAccordionItem.module.scss';

interface Props {
  exercise: CodeExercise;
}

const ExerciseAccordionItem: React.FC<Props> = ({ exercise }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Mutations
  const [updateTestCase] = useUpdateTestCaseMutation();
  const [addTestCase, { isLoading: isAdding }] = useAddTestCaseMutation();
  const [deleteTestCase] = useDeleteTestCaseMutation();
  const [trigger, { data: testCases, isLoading }] = useLazyGetTestCasesByExerciseQuery();

  // Local States for Add
  const [newInput, setNewInput] = useState('');
  const [newOutput, setNewOutput] = useState('');

  // Local States for Edit
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState('');
  const [editOutput, setEditOutput] = useState('');

  const toggleAccordion = () => {
    if (!isOpen) {
      trigger(exercise.id); 
    }
    setIsOpen(!isOpen);
  };

  const startEditing = (tc: TestCase) => {
    setEditingId(tc.id);
    setEditInput(tc.input);
    setEditOutput(tc.output);
  };

  const handleUpdate = async (tc: TestCase) => {
    try {
      await updateTestCase({
        ...tc,
        input: editInput,
        output: editOutput
      }).unwrap();
      setEditingId(null); 
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  const handleAddTest = async () => {
    if (!newInput.trim() || !newOutput.trim()) return;
    try {
      await addTestCase({
        exerciseId: exercise.id,
        input: newInput,
        output: newOutput
      }).unwrap();
      setNewInput('');
      setNewOutput('');
    } catch (err) {
      console.error("Failed to add test case:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("בטוח שברצונך למחוק מקרה מבחן זה?")) {
      await deleteTestCase({ id, exerciseId: exercise.id });
    }
  };

  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header} onClick={toggleAccordion}>
        <div className={styles.info}>
          <div className={styles.titleRow}>
            <h3>{exercise.exerciseName}</h3>
            <span className={styles.badge}>{exercise.language}</span>
          </div>
          {exercise.description && <p className={styles.desc}>{exercise.description}</p>}
        </div>
        <div className={styles.arrow}>{isOpen ? '▲' : '▼'}</div>
      </div>

      {isOpen && (
        <div className={styles.content}>
          <hr className={styles.divider} />
          <h4>Test case management</h4>
          
          {isLoading ? (
            <p>Loading test cases...</p>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Input</th>
                    <th>Output</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testCases?.map((tc) => (
                    <tr key={tc.id}>
                      {editingId === tc.id ? (
                        <>
                          <td><input value={editInput} onChange={(e) => setEditInput(e.target.value)} /></td>
                          <td><input value={editOutput} onChange={(e) => setEditOutput(e.target.value)} /></td>
                          <td>
                            <button onClick={() => handleUpdate(tc)} className={styles.saveBtn}>שמור</button>
                            <button onClick={() => setEditingId(null)}>ביטול</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td><code>{tc.input}</code></td>
                          <td><code>{tc.output}</code></td>
                          <td>
                            <button onClick={() => startEditing(tc)} className={styles.editBtn}>ערוך</button>
                            <button onClick={() => handleDelete(tc.id)} className={styles.deleteBtn}>מחק</button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.quickAddForm}>
                <input 
                  placeholder="Input" 
                  value={newInput} 
                  onChange={(e) => setNewInput(e.target.value)} 
                />
                <input 
                  placeholder="Output" 
                  value={newOutput} 
                  onChange={(e) => setNewOutput(e.target.value)} 
                />
                <button 
                  onClick={handleAddTest}
                  disabled={isAdding || !newInput || !newOutput}
                >
                  {isAdding ? '...' : 'Add'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseAccordionItem;