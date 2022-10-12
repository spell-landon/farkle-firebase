import React from 'react';
import Link from 'next/link';

export const Button = ({ to, color, children, ...props }) => {
  return to ? (
    <Link href={`${to}`}>
      <a
        className={`${
          color ? color : 'bg-indigo-600'
        } rounded-lg w-full py-4 text-lg font-medium text-center`}>
        {children}
      </a>
    </Link>
  ) : (
    <button
      className={`${
        color ? color : 'bg-indigo-600'
      } rounded-lg w-full py-4 text-lg font-medium`}
      {...props}>
      {children}
    </button>
  );
};
