import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import React from 'react';
import { useRouter } from 'next/router';
import { BsChevronLeft } from 'react-icons/bs';

export const Nav = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const navigate = (value) => {
    router.push(value);
  };

  return (
    <nav
      className={`py-6 px-4 flex items-center align-middle bg-transparent fixed inset-x-0 top-0 ${
        router.route === '/' ? 'justify-end' : 'justify-between'
      }`}>
      {router.route != '/' && (
        <button
          onClick={() => navigate('/')}
          className='font-semibold flex items-center gap-2'>
          <BsChevronLeft className='text-xl text-white' />
          Home
        </button>
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
        </div>
      )}
    </nav>
  );
};
