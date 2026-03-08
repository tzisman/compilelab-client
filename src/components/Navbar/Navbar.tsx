import { Link } from 'react-router-dom';
//import { useAppSelector } from '../../app/hooks';
import styles from './Navbar.module.scss'; 

const Navbar = () => {
  //const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const isAuthenticated = false; 
  const user = null;
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">home</Link>
      </div>
      

      <ul className={styles.navLinks}>
        <li>
          <Link to="/studies">studies</Link>
        </li>
        <li>
          <Link to="/instructors">instructors</Link>
        </li>
        <li>
          <Link to="/reqwests">reqwests</Link>
        </li>
        
        {isAuthenticated ? (
          <li className={styles.userInfo}>hello, {user}</li>
        ) : (
          <li>
            <Link to="/login">login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;