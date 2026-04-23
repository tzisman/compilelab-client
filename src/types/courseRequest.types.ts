export interface CourseRequest {
    id: number;
    studentName: string;
    courseName: string;
    requestDate: string | Date;
    message?: string;
}