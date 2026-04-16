export interface Course {
  id: number;
  name: string;
  studiesCount: number;
  exercisesCount: number;
}

export interface CreateCourseRequest {
    name: string;
    lecturerId: number;
}