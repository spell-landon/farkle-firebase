import React from 'react';
import { Button } from '../components/elements/Button';
import { useRouter } from 'next/router';
// import { database } from '../utils/firebase';

const StartNewGame = ({ gameId }) => {
  console.log(gameId);
  // console.log(database);
  const router = useRouter();
  const navigate = (value) => {
    router.push(value);
  };

  // async function getInitialGameData() {
  //   const query = `query Game($id: ID!) {
  //     Game(id: $id) {
  //       id
  //       totalPoints
  //       players
  //     }
  //   }`;

  //   await fetch(
  //     'https://api-us-east-1.hygraph.com/v2/cl97rgpjn0snz01uka80u3s2z/master',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //       body: JSON.stringify({ query, variables: { id } }),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .then(() => router.push('/start-new-game'));
  // }

  return (
    <div className='w-full flex flex-col justify-center items-center h-full gap-12'>
      <h2 className='text-3xl font-medium text-white text-center'>
        Begin by adding players to the game
      </h2>
      <Button onClick={() => navigate('/add-players')}>
        Start Adding Players
      </Button>
    </div>
  );
};

export default StartNewGame;
