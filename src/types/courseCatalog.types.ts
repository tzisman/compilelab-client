export interface CourseCatalog {
    id: number;
    name: string;
    lecturerName: string;
    studiesCount: number;
    exercisesCount: number;
}

export interface JoinToCourseRequest {
    id: number;
    userId: number;
    courseId: number;
    message: string;
}