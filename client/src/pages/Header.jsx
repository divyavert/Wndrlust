import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContextProvider';

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div>
        <header className='flex justify-between'>
          <Link to={'/'} href='' className='flex items-center gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-9 h-9'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25'
              />
            </svg>
            <span className='font-bold text-xl'>Wndrlust</span>
          </Link>
          <div className='flex border gap-2 border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-400'>
            <div>anywhere</div>
            <div className='border-l border-gray-300 '></div>
            <div>any week</div>
            <div className='border-l border-gray-300 '></div>
            <div>add guest</div>
            <div className='border-l border-gray-300 '></div>

            <button className='bg-primary text-white p-1 rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                />
              </svg>
            </button>
          </div>
          <Link
            to={user ? '/account' : '/login'}
            className='flex items-center border gap-2 border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-400'
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
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
            <div className=' bg-gray-900 text-white rounded-full '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6'
              >
                <path
                  fillRule='evenodd'
                  d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            {!!user && <div>{user.name}</div>}
          </Link>
        </header>
      </div>
    </>
  );
};

export default Header;
