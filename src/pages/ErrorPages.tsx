// pages/ErrorPages.tsx
import { Link } from 'react-router-dom';
import styles from './Pages.module.scss';

export const NotFound = () => (
  <div className={styles.errorContainer}>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>Oops! The page you are looking for doesn't exist or has been moved.</p>
    <Link to="/" className={styles.linkBtn}>Back to Home</Link>
  </div>
);

export const ServerError = () => (
  <div className={styles.errorContainer}>
    <h1>500</h1>
    <h2>Internal Server Error</h2>
    <p>Something went wrong on our end. We are working to fix it!</p>
    <Link to="/" className={styles.linkBtn}>Try again later</Link>
  </div>
);

export const ServerDown = () => (
  <div className={styles.errorContainer}>
    <div className={styles.icon}>🔌</div>
    <h2>Server Connection Lost</h2>
    <p>We can't reach the server right now. Please make sure the backend is running.</p>
    <button onClick={() => window.location.reload()} className={styles.actionBtn}>
      Retry Connection
    </button>
  </div>
);