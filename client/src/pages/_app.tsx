import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Zoom } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer theme='dark' />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
