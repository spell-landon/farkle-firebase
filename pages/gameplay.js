import React, { useState, useEffect } from 'react';
import { Button } from '../components/elements/Button';
import { useRouter } from 'next/router';
import { database } from '../utils/firebase';
import { ref, set, onValue, remove } from 'firebase/database';

const Gameplay = () => {
  const [activePlayers, setActivePlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [counter, setCounter] = useState(0);
  const [farkled, setFarkled] = useState(false);

  const router = useRouter();
  const navigate = (value) => {
    router.push(value);
  };

  // Get the players from the firebase database
  const getPlayers = () => {
    let data;
    const playersRef = ref(database, 'game/players');
    onValue(playersRef, (snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();
      }
    });
    return data;
  };

  // Convert firebase players into array
  const convertObjectToArray = (value) => {
    if (!value) {
      return null;
    } else {
      const result = Object.values(value);
      return result;
    }
  };

  // On mount, grab and convert players
  useEffect(() => {
    const players = getPlayers();
    console.log(players);
    const convertedPlayers = convertObjectToArray(players);
    console.log(convertedPlayers);
    setActivePlayers(convertedPlayers);
  }, []);

  // Once players have loaded, set the current player
  useEffect(() => {
    console.log('players have changed!');
    if (activePlayers) {
      setCurrentPlayer(activePlayers[0]);
    }
  }, [activePlayers]);

  const [width, setWidth] = useState(0);
  const scoreBarCalculation = (score) => {
    let num;
    if (score === 0) {
      num = score.toString();
    } else if (score >= 10000) {
      num = 100;
    } else {
      num = (score / 10000) * 100;
    }
    setWidth(num);
    console.log(width);
  };

  // Increment the player and add points
  const increment = () => {
    currentPlayer.score += 1000;
    scoreBarCalculation(currentPlayer.score);

    const newCount = counter + 1;
    if (newCount >= activePlayers.length) {
      setCounter(0);
    } else {
      setCounter(newCount);
    }
    console.log(activePlayers);
  };

  // If players busts on the turn, set farkled state and increment counter
  const farkle = () => {
    setFarkled(true);
    setTimeout(() => {
      setFarkled(false);
      const newCount = counter + 1;
      if (newCount >= activePlayers.length) {
        setCounter(0);
      } else {
        setCounter(newCount);
      }
    }, 1000);
  };

  // When counter changes, update the current player
  useEffect(() => {
    setCurrentPlayer(activePlayers[counter]);
  }, [counter]);

  return (
    <div className='w-full flex flex-col justify-start items-center h-full gap-6'>
      {currentPlayer && (
        <h2
          key={currentPlayer.playerName}
          className='text-3xl font-medium text-white text-center'>
          {farkled
            ? `${currentPlayer.playerName} Busted!`
            : `${currentPlayer.playerName}'s Roll`}
        </h2>
      )}

      <div className='w-full flex flex-col gap-4'>
        {activePlayers &&
          activePlayers.map((player) => {
            return (
              <div key={player.playerName} className='relative'>
                <div
                  className={`text-2xl font-medium text-center w-full flex justify-between items-center rounded-lg p-4 z-[1] ${
                    player.playerName === activePlayers[counter].playerName
                      ? `bg-black/20 text-white`
                      : 'bg-white/30 text-white'
                  } `}>
                  <span className='z-[3]'>{player.playerName}</span>
                  <span className='z-[3]'>{player.score} / 10,000</span>
                </div>
                <div
                  className={`absolute inset-y-0 left-0 rounded-l-lg z-[2] ${player.playerColor.bgColor} w-[${width}%]`}></div>
              </div>
            );
          })}
      </div>

      <Calculator />

      {/* Buttons */}
      <div className='w-full flex gap-4'>
        <Button color={`bg-rose-500`} onClick={farkle}>
          Farkle
        </Button>
        <Button color={`bg-emerald-400`} onClick={() => increment()}>
          Add Points
        </Button>
      </div>
    </div>
  );
};

const Calculator = () => {
  return <div className='mt-auto'>Calculator</div>;
};

export default Gameplay;
