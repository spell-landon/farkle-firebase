import Head from 'next/head';
import Link from 'next/link';
import { stringify } from 'postcss';
import { useEffect, useState } from 'react';
import { usePlayersContext } from '../utils/playerReducer';

export default function Home() {
  const [players, setPlayers] = usePlayersContext();
  console.log('Index: ', players);
  return (
    <div>
      <Head>
        <title>Farkle Scorekeeper</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h2>Welcome to Farkle ScoreKeeper</h2>
        <Link href={'/add-users'}>
          <a>Add new users here</a>
        </Link>
        <span>Current Players:</span>
        <ul>
          {players &&
            players.map((player, index) => {
              return <li key={index}>{player.firstName}</li>;
            })}
        </ul>
      </main>
    </div>
  );
}
