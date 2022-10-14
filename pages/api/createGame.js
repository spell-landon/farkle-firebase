import { GraphQLClient } from 'graphql-request';

export async function api({ body }, res) {
  const hygraph = new GraphQLClient(
    'https://api-us-east-1.hygraph.com/v2/cl97rgpjn0snz01uka80u3s2z/master'
    // {
    //   headers: {
    //     authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    //   },
    // }
  );

  const { game } = await hygraph.request(
    `mutation {
      createGame(data: { totalPoints: 10000 }) {
        id
        totalPoints
      }
    }`,
    { totalPoints: body.totalPoints }
  );

  console.log('GAME: ', game);

  return res.status(201).json(game);
}
