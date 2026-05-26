import React, { useState } from 'react';
import type { CodeExercise, TestCase } from '../../types/exercise.types';
import { 
    useLazyGetTestCasesByExerciseQuery,
    useDeleteTestCaseMutation,
    useAddTestCaseMutation,
    useUpdateTestCaseMutation 
} from './exerciseApi';
import { ChevronDown, Pencil, Trash2, Check, X, Plus } from 'lucide-react';

interface Props {
  exercise: CodeExercise;
}

const ExerciseAccordionItem: React.FC<Props> = ({ exercise }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [updateTestCase] = useUpdateTestCaseMutation();
  const [addTestCase, { isLoading: isAdding }] = useAddTestCaseMutation();
  const [deleteTestCase] = useDeleteTestCaseMutation();
  const [trigger, { data: testCases, isLoading }] = useLazyGetTestCasesByExerciseQuery();

  const [newInput, setNewInput] = useState('');
  const [newOutput, setNewOutput] = useState('');

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
      await updateTestCase({ ...tc, input: editInput, output: editOutput }).unwrap();
      setEditingId(null); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTest = async () => {
    if (!newInput.trim() || !newOutput.trim()) return;
    try {
      await addTestCase({ exerciseId: exercise.id, input: newInput, output: newOutput }).unwrap();
      setNewInput('');
      setNewOutput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this test case?")) {
      await deleteTestCase({ id, exerciseId: exercise.id });
    }
  };

  return (
    <div className={`w-full bg-white rounded-3xl border transition-all duration-200 ${isOpen ? 'border-cyan-200 shadow-md' : 'border-gray-100 shadow-sm hover:border-gray-200'}`}>
      
      {/* ACCORDION HEADER */}
      <div 
        className="p-6 flex items-center justify-between cursor-pointer select-none"
        onClick={toggleAccordion}
      >
        <div className="flex flex-col gap-1 text-left">
          <div className="flex items-center gap-3">
            <h3 className="font-mono text-lg font-bold text-cyan-500 tracking-wide">
              {exercise.exerciseName}
            </h3>
            <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-500 font-mono text-xs font-bold uppercase">
              {exercise.language}
            </span>
          </div>
          {exercise.description && (
            <p className="text-gray-400 text-sm mt-1 font-sans">{exercise.description}</p>
          )}
        </div>
        
        <div className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-500' : ''}`}>
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>

      {/* ACCORDION CONTENT */}
      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-gray-50 bg-[#fafbfc] rounded-b-3xl">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono mb-4">
            Test Cases Management
          </h4>
          
          {isLoading ? (
            <div className="text-xs font-mono text-gray-400 animate-pulse py-4">Loading test cases...</div>
          ) : (
            <div className="w-full flex flex-col gap-4">
              
              {/* TABLE CONTAINER WITH SCROLL */}
              <div className="w-full overflow-x-auto border border-gray-100 rounded-2xl bg-white shadow-2xs">
                <table className="w-full border-collapse text-left text-sm min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 font-mono text-gray-500 text-xs uppercase">
                      <th className="p-4 font-bold min-w-[200px]">Input</th>
                      <th className="p-4 font-bold min-w-[200px]">Expected Output</th>
                      <th className="p-4 font-bold text-center w-28 sticky right-0 bg-gray-50 shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.03)]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-mono text-xs text-gray-700">
                    {testCases?.map((tc) => (
                      <tr key={tc.id} className="hover:bg-gray-50/50 transition-colors group">
                        {editingId === tc.id ? (
                          <>
                            <td className="p-3">
                              <input 
                                className="w-full bg-gray-50 border border-cyan-400 rounded-lg px-3 py-1.5 focus:outline-none text-cyan-600 font-mono"
                                value={editInput} 
                                onChange={(e) => setEditInput(e.target.value)} 
                              />
                            </td>
                            <td className="p-3">
                              <input 
                                className="w-full bg-gray-50 border border-cyan-400 rounded-lg px-3 py-1.5 focus:outline-none text-cyan-600 font-mono"
                                value={editOutput} 
                                onChange={(e) => setEditOutput(e.target.value)} 
                              />
                            </td>
                            <td className="p-3 text-center sticky right-0 bg-white group-hover:bg-gray-50/50 shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.03)]">
                              <div className="flex items-center justify-center gap-1.5">
                                <button onClick={() => handleUpdate(tc)} className="p-1.5 text-green-500 hover:bg-green-50 rounded-md transition-all cursor-pointer"><Check className="h-4 w-4" /></button>
                                <button onClick={() => setEditingId(null)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-md transition-all cursor-pointer"><X className="h-4 w-4" /></button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="p-4 max-w-xs sm:max-w-md overflow-hidden text-ellipsis whitespace-nowrap">
                              <code className="bg-gray-100 px-2 py-1 rounded text-gray-600 font-semibold inline-block max-w-full overflow-x-auto scrollbar-none">
                                {tc.input}
                              </code>
                            </td>
                            <td className="p-4 max-w-xs sm:max-w-md overflow-hidden text-ellipsis whitespace-nowrap">
                              <code className="bg-gray-100 px-2 py-1 rounded text-gray-600 font-semibold inline-block max-w-full overflow-x-auto scrollbar-none">
                                {tc.output}
                              </code>
                            </td>
                            <td className="p-4 text-center sticky right-0 bg-white group-hover:bg-[#fcfdfe] shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.03)] transition-colors">
                              <div className="flex items-center justify-center gap-2">
                                <button onClick={() => startEditing(tc)} className="p-1.5 text-gray-400 hover:text-cyan-500 hover:bg-cyan-50/50 rounded-lg transition-all cursor-pointer"><Pencil className="h-3.5 w-3.5" /></button>
                                <button onClick={() => handleDelete(tc.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* QUICK ADD FORM */}
              <div className="flex flex-col sm:flex-row gap-3 bg-white border border-gray-100 p-4 rounded-2xl shadow-2xs items-center">
                <input 
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 font-mono text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Test Input..." 
                  value={newInput} 
                  onChange={(e) => setNewInput(e.target.value)} 
                />
                <input 
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 font-mono text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Expected Output..." 
                  value={newOutput} 
                  onChange={(e) => setNewOutput(e.target.value)} 
                />
                <button 
                  onClick={handleAddTest}
                  disabled={isAdding || !newInput.trim() || !newOutput.trim()}
                  className="flex items-center gap-1 bg-[#f5b813] text-[#334148] font-mono text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#e0a610] transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer shadow-2xs border-none"
                >
                  <Plus className="h-3.5 w-3.5 stroke-[2.5]" /> Add
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