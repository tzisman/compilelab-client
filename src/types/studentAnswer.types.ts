export interface StudentAnswer {
  id: number;
  userInCourseId: number;
  exerciseId: number;
  answerCode?: string;
  mark: number;
  remark?: string;
}

export interface AnswerMark {
  isSuccess: boolean;
  mark: number;
  remark?: string;
  typeError: string;
  errorMessage: string;
}