import React, { useState } from 'react';
import styles from './CourseCatalogCard.module.scss';
import type { CourseCatalog } from '../../types/courseCatalog.types';
import JoinCourseModal from './JoinCourseModal';
 import { useJoinToCourseMutation } from './courseCatalogApi';
import { useAppSelector } from '../../app/hooks';

interface CourseCatalogCardProps {
  course: CourseCatalog;
}

const CourseCatalogCard: React.FC<CourseCatalogCardProps> = ({ course }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [joinCourse] = useJoinToCourseMutation();
  const lecturerId = useAppSelector((state) => state.auth.user?.id);

  const handleJoinSubmit = async (data: { message: string }) => {
    if (!lecturerId) {
        alert("User session expired. Please log in again.");
        return;
    }

    try {
      console.log(`Joining course ${course.id} with message: ${data.message}`);
      await joinCourse({id:0, userId: lecturerId, courseId: course.id, message: data.message }).unwrap();
      setIsModalOpen(false);
      alert('Request sent successfully!');
    } catch (err) {
      alert('Failed to join course' + err);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>{course.name}</h3>
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Lecturer</span>
            <span className={styles.statValue}>{course.lecturerName}</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Exercises</span>
            <span className={styles.statValue}>{course.exercisesCount}</span>
          </div>
        </div>

        <button 
          className={styles.manageBtn} 
          onClick={() => setIsModalOpen(true)}
        >
          Join This Course
        </button>
      </div>

      {isModalOpen && (
        <JoinCourseModal 
          course={course} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleJoinSubmit}
        />
      )}
    </>
  );
};

export default CourseCatalogCard;