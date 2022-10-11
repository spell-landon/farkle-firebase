import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import React from 'react';
import Image from 'next/image';

export const Nav = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <nav className='py-4 px-4 flex justify-between items-center align-middle bg-gray-200 dark:bg-gray-800'>
      <Link href={'/'}>Farkle ScoreKeeper</Link>
      <ul>
        {!user && (
          <Link href={'/auth/login'}>
            <a className='py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium min-h-12'>
              Join Now
            </a>
          </Link>
        )}
        {user && (
          <div>
            <Link href={'/dashboard'}>
              <img
                src={user.photoURL}
                alt='avatar'
                referrerPolicy='no-referrer'
                className='h-12 rounded-full cursor-pointer'
              />
            </Link>
            {/* <div className='absolute w-12 h-12 rounded-full opacity-0 group:hover:opacity-1 bg-black/20 z-10'></div> */}
          </div>
        )}
      </ul>
    </nav>
  );
};
