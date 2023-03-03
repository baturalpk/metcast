import '@/globals.css';
import useAppPreferencesStore from '@/stores/appPreferences';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { setDarkModeEnabled } = useAppPreferencesStore();

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Set the initial state
    setDarkModeEnabled(prefersDarkScheme.matches);

    // Watch the OS theme changes
    prefersDarkScheme.addEventListener('change', e =>
      setDarkModeEnabled(e.matches)
    );
  }, [setDarkModeEnabled]);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
