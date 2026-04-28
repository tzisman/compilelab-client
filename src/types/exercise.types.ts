
export const ProgrammingLanguage = {
  CSharp: 0,
  Python: 1,
} as const;

export type ProgrammingLanguage = typeof ProgrammingLanguage[keyof typeof ProgrammingLanguage];

export interface TestCase {
    id: number;
    exerciseId: number;
    input: string;
    output: string; 
}

export interface CodeExercise {
    id: number;
    courseId: number;
    exerciseName: string;
    language: ProgrammingLanguage;
    description?: string;
}

