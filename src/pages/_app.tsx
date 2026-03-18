import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';
import { SearchProvider } from '../contexts/SearchContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ToastProvider } from '../components/ToastProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SearchProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SearchProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
