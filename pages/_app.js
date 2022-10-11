import { Layout } from '../components/layout';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { PlayersProvider } from '../utils/playerReducer';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
      <PlayersProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PlayersProvider>
    </ThemeProvider>
  );
}

export default MyApp;
