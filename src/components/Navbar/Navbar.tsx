import React from 'react';
import { Link } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { logoutUser } from '../../redux/features/authSlice';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    dispatch(logoutUser());
  };

  return (
    <nav className='flex w-full items-center justify-between'>
      {isLoading ? (
        <div className='w-full bg-slate-400 animate-pulse h-20'></div>
      ) : (
        <>
          <h1>
            <Link to='/'>Portfolio</Link>
          </h1>
          <ul className='flex flex-1 justify-evenly '>
            <li>
              <Link to='/'> Home </Link>
            </li>
            <li>
              <Link to='/stocks'> Stocks </Link>
            </li>
            {user !== null ? (
              <>
                <li>
                  {' '}
                  <Link to='/dashboard'> Dashboard </Link>
                </li>
                <li>
                  <Link to='/my-profile'> Profile </Link>
                </li>
                <li>
                  <button onClick={handleLogout}> Logout </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/login'> Login </Link>
                </li>
                <li>
                  <Link to='/signup'> SignUp </Link>
                </li>
              </>
            )}
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navbar;
