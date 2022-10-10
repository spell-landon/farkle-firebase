import React from 'react';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const { theme, setTheme } = useTheme();
  const route = useRouter();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    route.push('/auth/login');
  } else {
    return (
      <div className='space-y-4'>
        <h1>Welcome to your dashboard {user?.displayName}</h1>
        <div className='flex justify-between items-center'>
          <button onClick={() => auth.signOut()}>Sign Out</button>
          <button
            aria-label='Toggle Dark Mode'
            type='button'
            className='p-3 h-12 order-2 md:order-3 border rounded-lg'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            Dark Mode Toggle
          </button>
        </div>
      </div>
    );
  }
};

export default Dashboard;
