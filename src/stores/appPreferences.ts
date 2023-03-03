import produce from 'immer';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface AppPreferences {
  darkModeEnabled: boolean;
}

export interface AppPreferencesState {
  preferences: AppPreferences;
  setDarkModeEnabled: (payload: boolean) => void;
}

const useAppPreferencesStore = create<AppPreferencesState>()(
  devtools(
    persist(
      set => ({
        preferences: {
          darkModeEnabled: false,
        },

        setDarkModeEnabled(payload) {
          set(
            produce(({ preferences }: AppPreferencesState) => {
              preferences.darkModeEnabled = payload;
            })
          );
        },
      }),
      {
        name: 'app-preferences-store',
      }
    )
  )
);

export default useAppPreferencesStore;
