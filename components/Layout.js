import { Nav } from './nav';
import React from 'react';

export const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <main className='p-4 md:p-6 h-[calc(100vh-70px)] flex flex-col justify-start items-start'>
        {children}
      </main>
    </div>
  );
};
