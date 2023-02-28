import "@/globals.css";
import useAppPreferencesStore from "@/stores/appPreferences";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const setDarkModeEnabled = useAppPreferencesStore(
    state => state.setDarkModeEnabled
  );

  useEffect(() => {
    setDarkModeEnabled(
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  return <Component {...pageProps} />;
}
