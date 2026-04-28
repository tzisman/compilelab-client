import React, { useState } from 'react';
import type { Course } from '../../types/teacherCourse.types.ts';
import styles from './CourseCard.module.scss';
import { useNavigate } from 'react-router-dom'; 
import { useAppSelector } from '../../app/hooks'; 
import { useUpdateTeacherCourseMutation } from './teacherCourseApi.ts';

interface CourseCardProps {
  course: Course;
}

const TeacherCourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(course.name);

  const lecturerId = useAppSelector((state) => state.auth.user?.id);
  const [updateCourse, { isLoading }] = useUpdateTeacherCourseMutation();

const handleUpdate = async () => {
  try {

    if (!newName.trim()) {
      alert("Please enter a course name");
      return;
    }

    if (!lecturerId) {
        alert("User session expired. Please log in again.");
        return;
    }

    await updateCourse({ 
      id: course.id,       
      name: newName,          
      lecturerId: lecturerId
    }).unwrap();

    setIsEditing(false);
  } catch (err) {
    console.error("Failed to update:", err);
    alert("error in the update of the course");
  }
};

  const handleManageClick = () => {
    navigate(`/manage-course/${course.id}`);
  };

  return (
    <div className={styles.card}>
      {isEditing ? (
        <div className={styles.editSection}>
          <input 
            className={styles.editInput}
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
          />
          <div className={styles.editButtons}>
            <button onClick={handleUpdate} disabled={isLoading}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>{course.name}</h3>
          <button className={styles.editIcon} onClick={() => setIsEditing(true)}>✎</button>
        </div>
      )}

      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Studies</span>
          <span className={styles.statValue}>{course.studiesCount}</span>
        </div>
        
        <div className={styles.divider} />
        
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Exercises</span>
          <span className={styles.statValue}>{course.exercisesCount}</span>
        </div>
        <div></div>
      </div>

      {!isEditing && (
        <button className={styles.manageBtn} onClick={handleManageClick}>
          Manage Course
        </button>
      )}
    </div>
  );
};

export default TeacherCourseCard;