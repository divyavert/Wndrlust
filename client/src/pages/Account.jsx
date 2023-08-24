import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContextProvider';
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Accommodation from './accommodation';
import axios from 'axios';

const Account = () => {
  let { subpage } = useParams();
  const [redirect, setRedirect] = useState(false);
  const { user, ready, setUser } = useContext(UserContext);
  if (subpage === undefined) {
    subpage = 'profile';
  }

  const handleLogout = () => {
    axios.post('/logout');
    setRedirect(true);
    setUser(null);
  };
  if (!ready) {
    return 'loading.....';
  }
  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }
  if (redirect) {
    return <Navigate to={'/'} />;
  }
  const linkClasses = (type) => {
    if (type === subpage) {
      return 'inline-flex gap-2 py-2 px-6 bg-primary text-white rounded-full';
    } else {
      return 'inline-flex bg-gray-200 rounded-full gap-2 py-2 px-6';
    }
  };

  return (
    <div>
      <nav className='w-full flex mt-4 mb-4 gap-2 justify-center'>
        <Link to={'/account'} className={linkClasses('profile')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
            />
          </svg>
          my profile
        </Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
            />
          </svg>
          My Bookings
        </Link>
        <Link
          className={linkClasses('accommodations')}
          to={'/account/accommodations'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819'
            />
          </svg>
          My accommodations
        </Link>
      </nav>
      {subpage == 'profile' && (
        <div className='text-center mx-auto  max-w-lg'>
          logged in as {user?.name} ({user.email})
          <button onClick={handleLogout} className='primary mx-w-sm'>
            Log out
          </button>
        </div>
      )}
      {subpage == 'accommodations' && <Accommodation />}
    </div>
  );
};

export default Account;
