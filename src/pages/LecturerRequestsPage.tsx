import React from 'react';
import { useGetPendingRequestsQuery } from '../features/course-request/courseRequestApi';
import CourseRequestCard from '../features/course-request/CourseRequestCard';
import styles from './LecturerRequestsPage.module.scss';

const LecturerRequestsPage: React.FC = () => {
  const { data: requests, isLoading } = useGetPendingRequestsQuery();

  if (isLoading) return <div className={styles.loader}>Loading...</div>;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Student Requests</h1>
      </header>

      <div className={styles.grid}>
        {requests?.length === 0 ? (
          <p className={styles.noData}>No pending requests found.</p>
        ) : (
          requests?.map(req => (
            <CourseRequestCard key={req.id} request={req} />
          ))
        )}
      </div>
    </div>
  );
};

export default LecturerRequestsPage;