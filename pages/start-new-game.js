import React from 'react';
import { Button } from '../components/elements/Button';
import { useRouter } from 'next/router';

const StartNewGame = () => {
  const router = useRouter();
  const navigate = (value) => {
    router.push(value);
  };

  return (
    <div className='w-full flex flex-col justify-center items-center h-full gap-12'>
      <h2 className='text-3xl font-medium text-white text-center'>
        Begin by adding players to the game
      </h2>
      <Button onClick={() => navigate('/add-players')}>Add New Player</Button>
    </div>
  );
};

export default StartNewGame;
