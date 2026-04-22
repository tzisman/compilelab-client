import React from 'react';
import styles from './CourseCatalogPage.module.scss';
import CourseCatalogCard from '../features/course-catalog/CourseCatalogCard';
import { useGetCourseCatalogQuery } from '../features/course-catalog/courseCatalogApi';

const CourseCatalogPage: React.FC = () => {
  
  const { data: allCourses, error, isLoading } = useGetCourseCatalogQuery();

  if (isLoading) {
    return (
      <div className={styles.catalogContainer}>
        <div className={styles.headerSection}>
          <h1 className={styles.mainTitle}>Loading Catalog...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.catalogContainer}>
        <div className={styles.emptyCatalog}>
          <h3>Oops! Something went wrong</h3>
          <p>We couldn't fetch the courses. Please try again later.</p>
        </div>
      </div>
    );
  }

  const hasCourses = allCourses && allCourses.length > 0;

  return (
    <div className={styles.catalogContainer}>
      <header className={styles.headerSection}>
        <h1 className={styles.mainTitle}>Join a New Course</h1>
        <p className={styles.subTitle}>Explore all our available courses and start learning today.</p>
      </header>

      {!hasCourses ? (
        <div className={styles.emptyCatalog}>
          <div className={styles.emptyIcon}>📚</div>
          <h3>No Courses Available</h3>
          <p>Check back soon! New courses are added regularly.</p>
        </div>
      ) : (
        <div className={styles.catalogGrid}>
          {allCourses.map((course) => (
            <CourseCatalogCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseCatalogPage;