import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user && router.pathname !== '/login') {
        router.push('/login');
      }
      setIsReady(true);
    }
  }, [user, loading, router]);

  if (!isReady) {
    return null;
  }

  return <Component {...pageProps} />;
}

export default function App(props: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <AppContent {...props} />
      </AuthProvider>
    </ChakraProvider>
  );
}
