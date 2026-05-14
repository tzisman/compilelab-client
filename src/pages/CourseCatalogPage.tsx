import React, { useState } from 'react';
import styles from './CourseCatalogPage.module.scss';
import CourseCatalogCard from '../features/course-catalog/CourseCatalogCard';
import { useGetCourseCatalogQuery } from '../features/course-catalog/courseCatalogApi';

const CourseCatalogPage: React.FC = () => {
  // ניהול מצב לחיפוש ודפדוף
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // העברת הפרמטרים ל-Hook
  const { data: allCourses, error, isLoading, isFetching } = useGetCourseCatalogQuery({
    page: page,
    size: pageSize,
    search: searchTerm
  });

  if (isLoading) {
    return (
      <div className={styles.catalogContainer}>
        <h1 className={styles.mainTitle}>Loading Catalog...</h1>
      </div>
    );
  }

  const hasCourses = allCourses && allCourses.length > 0;

  return (
    <div className={styles.catalogContainer}>
      <header className={styles.headerSection}>
        <h1 className={styles.mainTitle}>Join a New Course</h1>
        
        {/* תיבת חיפוש */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // כשמחפשים, חוזרים לעמוד הראשון
            }}
          />
        </div>
      </header>

      {/* אינדיקטור טעינה בזמן דפדוף/חיפוש (אופציונלי) */}
      {isFetching && <p>Updating results...</p>}

      {!hasCourses ? (
        <div className={styles.emptyCatalog}>
          <h3>No Courses Found</h3>
        </div>
      ) : (
        <>
          <div className={styles.catalogGrid}>
            {allCourses.map((course) => (
              <CourseCatalogCard key={course.id} course={course} />
            ))}
          </div>

          {/* כפתורי ניווט פשוטים */}
          <div className={styles.pagination}>
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button 
              disabled={allCourses.length < pageSize} 
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseCatalogPage;