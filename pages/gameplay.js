import React from 'react';
import { Button } from '../components/elements/Button';
import { useRouter } from 'next/router';
// import { database } from '../utils/firebase';

const Gameplay = () => {
  // console.log(database);
  const router = useRouter();
  const navigate = (value) => {
    router.push(value);
  };

  return (
    <div className='w-full flex flex-col justify-center items-center h-full gap-12'>
      <h2 className='text-3xl font-medium text-white text-center'>
        Welcome to the Game!
      </h2>
    </div>
  );
};

export default Gameplay;
