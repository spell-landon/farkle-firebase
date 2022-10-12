import { Nav } from './nav';
import React from 'react';

export const Layout = ({ children }) => {
  return (
    <div className='bg-gradient-to-br from-cyan-500 to-blue-500'>
      <Nav />
      <main className='p-4 md:p-6 h-screen pt-20 flex flex-col justify-start items-start'>
        {children}
      </main>
    </div>
  );
};
