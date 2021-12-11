import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer theme='dark' autoClose={1900} position='top-center' />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
