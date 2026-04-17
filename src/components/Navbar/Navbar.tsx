import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice'; 
import type { RootState } from '../../app/store'; 
import styles from './Navbar.module.scss'; 
import { apiSlice } from '../../api/apiSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    navigate('/login'); 
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">home</Link>
      </div>

      <ul className={styles.navLinks}>
        <li><Link to="/studies">studies</Link></li>
        <li><Link to="/instructors">instructors</Link></li>
        <li><Link to="/requests">requests</Link></li>
        
        {user ? (
          <>
            <li className={styles.userInfo}>hello, {user.name}</li>
            <li>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">login</Link></li>
            <li><Link to="/signup">signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;