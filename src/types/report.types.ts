export interface ExerciseGrade {
  exerciseId: number;
  exerciseName: string;
  grade: number | null; // משתמשים ב-null עבור "לא הוגש"
}

export interface CourseReport {
  studentId: number;
  studentName: string;
  exercises: ExerciseGrade[];
}