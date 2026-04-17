export interface Course {
  id: number;
  name: string;
  studiesCount: number;
  exercisesCount: number;
}

export interface CreateCourseRequest {
  id: number;
  name: string;
  lecturerId: number;
}