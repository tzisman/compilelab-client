export interface StudentExercise {
  id: number;
  name: string;
  description: string;
  programmingLanguage: string;
  grade: number | null; 
  studentAnswerId: number | null;
}