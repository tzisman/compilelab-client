import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CourseState {
  currentInCourseId: number | null;
  currentCourseId: number | null;
}

const getStoredValue = (key: string): number | null => {
  const value = localStorage.getItem(key);
  return value ? Number(value) : null;
};

const initialState: CourseState = {
  currentInCourseId: getStoredValue('inCourseId'),
  currentCourseId: getStoredValue('courseId'),
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCurrentCourseContext: (
      state, 
      action: PayloadAction<{ inCourseId: number; courseId: number }>
    ) => {
      state.currentInCourseId = action.payload.inCourseId;
      state.currentCourseId = action.payload.courseId;

      localStorage.setItem('inCourseId', action.payload.inCourseId.toString());
      localStorage.setItem('courseId', action.payload.courseId.toString());
    },

    clearCourseContext: (state) => {
      state.currentInCourseId = null;
      state.currentCourseId = null;

      localStorage.removeItem('inCourseId');
      localStorage.removeItem('courseId');
    },
  },
});

export const { setCurrentCourseContext, clearCourseContext } = courseSlice.actions;
export default courseSlice.reducer;