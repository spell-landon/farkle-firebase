import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import ColorPicker from '../components/ColorPicker';
import { Button } from '../components/elements/Button';

const AddPlayers = () => {
  const [playerColor, setPlayerColor] = useState(null);

  const router = useRouter();

  const navigate = (value) => {
    router.push(value);
  };

  const handleColorChange = (value) => {
    setPlayerColor(value);
  };

  return (
    <div className='w-full flex flex-col justify-between items-center h-full space-y-6'>
      <form className='w-full overflow-y-scroll'>
        <div className='space-y-6 pt-8'>
          <div>
            <h3 className='text-lg font-medium leading-6 text-white'>
              Player Information
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-white/75'>
              Set the player&apos;s display information here.
            </p>
          </div>
          <div className='space-y-6 sm:space-y-5'>
            <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
              <label
                htmlFor='first-name'
                className='block text-sm font-medium text-white/75 sm:mt-px sm:pt-2'>
                First name
              </label>
              <div className='mt-1 sm:col-span-2 sm:mt-0'>
                <input
                  type='text'
                  name='first-name'
                  id='first-name'
                  autoComplete='given-name'
                  className='block w-full max-w-lg rounded-md bg-white/50 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm p-2'
                />
              </div>
            </div>
          </div>
          <ColorPicker onSelection={(value) => handleColorChange(value)} />
        </div>
      </form>
      <div className={`w-full flex flex-col gap-4`}>
        <Button
          color={'bg-white/20'}
          onClick={() => console.log('Add ANother Player')}>
          Add Another Player
        </Button>
        <Button
          color={playerColor?.bgColor}
          onClick={() => navigate('/add-players')}>
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default AddPlayers;
