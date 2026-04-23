import React from 'react';
import { useHandleRequestMutation } from './courseRequestApi';
import type { CourseRequest } from '../../types/courseRequest.types';
import styles from './CourseRequestCard.module.scss';

interface CourseRequestCardProps {
  request: CourseRequest;
}

const CourseRequestCard: React.FC<CourseRequestCardProps> = ({ request }) => {
  const [handleRequest, { isLoading: isUpdating }] = useHandleRequestMutation();

  const onProcess = async (status: 'approved' | 'rejected') => {
    try {
      await handleRequest({ requestId: request.id, status }).unwrap();
    } catch {
      alert(`Action failed: ${status}`);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.studentName}>{request.studentName}</span>
        <span className={styles.date}>{new Date(request.requestDate).toLocaleDateString()}</span>
      </div>
      
      <div className={styles.courseName}>Course: {request.courseName}</div>
      
      <div className={styles.messageBox}>
        <p>{request.message}</p>
      </div>

      <div className={styles.actions}>
        <button 
          className={styles.rejectBtn} 
          onClick={() => onProcess('rejected')}
          disabled={isUpdating}
        >
          {isUpdating ? '...' : 'Reject'}
        </button>
        <button 
          className={styles.approveBtn} 
          onClick={() => onProcess('approved')}
          disabled={isUpdating}
        >
          {isUpdating ? '...' : 'Approve'}
        </button>
      </div>
    </div>
  );
};

export default CourseRequestCard;