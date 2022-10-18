import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ColorPicker from '../components/ColorPicker';
import { Button } from '../components/elements/Button';
import { MdDelete } from 'react-icons/md';
import { database } from '../utils/firebase';
import { ref, set, onValue, remove } from 'firebase/database';

const AddPlayers = () => {
  const [activePlayers, setActivePlayers] = useState(null);
  const [startGameText, setStartGameText] = useState(
    'You must have 2 or more players to start'
  );
  const [startGameError, setStartGameError] = useState(false);
  const [playerColor, setPlayerColor] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    playerName: '',
    playerColor: {},
  });
  const [err, setErr] = useState(true);

  const router = useRouter();

  const navigate = (value) => {
    router.push(value);
  };

  const handleColorChange = (value) => {
    setPlayerColor(value);
    setNewPlayer({ ...newPlayer, playerColor: value });
  };
  const handleChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.id]: e.target.value });
    console.log(newPlayer);
  };

  const writeNewPlayer = (newPlayerObject) => {
    console.log(newPlayerObject);
    const { playerName, playerColor } = newPlayerObject;
    set(ref(database, `game/players/${playerName}`), {
      playerName: playerName,
      playerColor: playerColor,
      score: 0,
    });
  };

  const getPlayers = () => {
    const playersRef = ref(database, 'game/players');
    onValue(playersRef, (snapshot) => {
      if (snapshot.exists()) {
        setErr(false);
        const data = snapshot.val();
        setActivePlayers(data);
      } else {
        setErr(true);
      }
    });
  };

  useEffect(() => {
    getPlayers();
  }, []);

  const convertObjectToArray = (value) => {
    if (!value) {
      return null;
    } else {
      const result = Object.values(value);
      return result;
    }
  };

  const deletePlayer = (name) => {
    getPlayers();
    remove(ref(database, `game/players/${name}`));
  };

  const startGame = () => {
    const players = convertObjectToArray(activePlayers);
    console.log(players);
    if (players.length >= 2) {
      setStartGameError(false);
      navigate('/gameplay');
    } else {
      setStartGameError(true);
    }
  };

  return (
    <div className='w-full flex flex-col justify-between items-center h-full space-y-6 max-h-screen'>
      <div className='w-full gap-4 flex flex-col h-full'>
        <form className='w-full'>
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
                  htmlFor='playerName'
                  className='block text-sm font-medium text-white/75 sm:mt-px sm:pt-2'>
                  Player Name
                </label>
                <div className='mt-1 sm:col-span-2 sm:mt-0'>
                  <input
                    type='text'
                    name='playerName'
                    id='playerName'
                    onChange={handleChange}
                    value={newPlayer.playerName}
                    autoComplete='given-name'
                    className='block w-full max-w-lg rounded-md bg-white/50 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm p-2'
                  />
                </div>
              </div>
            </div>
            <ColorPicker onSelection={(value) => handleColorChange(value)} />
          </div>
        </form>
        <div className='w-full flex flex-col gap-2 mt-8 overflow-y-scroll'>
          <h3 className='text-lg font-medium leading-6 text-white'>
            Current Players
          </h3>
          {err ? (
            <span className='text-white/60'>Start adding some players</span>
          ) : (
            <div className='flex flex-col w-full gap-2 overflow-y-scroll max-h-[200px]'>
              {convertObjectToArray(activePlayers).map((player, index) => {
                return (
                  <div
                    key={index}
                    className={`flex w-full justify-between ${player.playerColor.bgColor} p-2 rounded-lg items-center`}>
                    <span className='ml-4 truncate text-lg'>
                      {player.playerName}
                    </span>
                    <button
                      onClick={() => deletePlayer(player.playerName)}
                      className='bg-white p-2 rounded-md'>
                      <MdDelete className='text-2xl text-black' />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className={`w-full flex flex-col gap-4`}>
        <Button
          color={'bg-transparent text-white border-2 border-white'}
          onClick={() => writeNewPlayer(newPlayer)}>
          Add Player
        </Button>
        <div className='w-full flex flex-col gap-2'>
          {startGameError && (
            <p className='w-full text-center p-2 bg-red-500 text-white rounded-lg animate-pulse'>
              {startGameText}
            </p>
          )}
          <Button color={'bg-green-500/70'} onClick={() => startGame()}>
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPlayers;
