import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import {Logout, reset} from '../features/auth/authSlice';

function Header() {
    
    const Navigate = useNavigate();
    const Dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)
    const onLogout = () => {
        Dispatch(Logout())
        Dispatch(reset())
        Navigate('/')
    }

  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>TaskTraker</Link>
        </div>
        <ul>
            {user ? (
                <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
            ) :
             (<><li>
                <Link to='/register'>
                    <FaSignInAlt /> Register
                </Link>
            </li>
            <li>
                <Link to='/login'>
                    <FaUser /> LogIn
                </Link>
            </li></>) }
            
        </ul>
    </header>
  )
}

export default Header