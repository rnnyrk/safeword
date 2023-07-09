import type * as i from 'types';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useSegments } from 'expo-router/src/LocationProvider';
import jwt_decode, { JwtPayload } from 'jwt-decode';

import { createUser, getUserByEmail } from 'queries/users';

import { supabase } from './supabase';

type SupabaseContextProps = {
  loggedIn: boolean;
  user: i.User | null;
  getAppleOAuthUrl: () => Promise<string | null>;
  getGoogleOAuthUrl: () => Promise<string | null>;
  setOAuthSession: (tokens: { access_token: string; refresh_token: string }) => Promise<void>;
};

export const SupabaseContext = createContext<SupabaseContextProps>({
  loggedIn: false,
  user: null,
  getAppleOAuthUrl: async () => '',
  getGoogleOAuthUrl: async () => '',
  setOAuthSession: async () => {},
});

export function useSupabase() {
  return useContext(SupabaseContext);
}

function useProtectedRoute(user: i.User | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    // If the user is not signed in, and not on signin page
    if (!user && !inAuthGroup) {
      router.replace('/sign-in');
    } else if (user && inAuthGroup) {
      if (user.finished_onboarding) {
        router.replace('/');
      } else {
        router.replace('/onboarding');
      }
    }
  }, [segments]);
}

export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<i.User | null>(null);

  async function getSupabaseUser(token: string) {
    const decodedToken = jwt_decode(token) as JwtPayload;
    const userEmail = decodedToken.email;

    // Fetch user, is not existing, create the
    const data = await getUserByEmail(userEmail);

    if (data) {
      setUser(data);
    } else if (!data) {
      const { data: newUser, error: newUserError } = await createUser(userEmail);

      if (newUser && !newUserError) {
        setUser(newUser);
      } else if (newUserError) {
        console.error('Error creating new user', { newUserError });
      }
    }
  }

  // Check if the user still has an exisiting session
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      if (data.session) {
        await getSupabaseUser(data.session.access_token);
        setLoggedIn(true);
      }
    })();
  }, []);

  async function getAppleOAuthUrl(): Promise<string | null> {
    const result = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: 'com.safeword:/oauthredirect',
      },
    });

    return result.data.url;
  }

  async function getGoogleOAuthUrl(): Promise<string | null> {
    const result = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'com.safeword:/oauthredirect',
      },
    });

    return result.data.url;
  }

  async function setOAuthSession(tokens: { access_token: string; refresh_token: string }) {
    const { data, error } = await supabase.auth.setSession({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });

    if (error) throw error;

    await getSupabaseUser(tokens.access_token);
    setLoggedIn(data.session !== null);
  }

  useProtectedRoute(user);

  return (
    <SupabaseContext.Provider
      value={{
        loggedIn,
        user,
        getAppleOAuthUrl,
        getGoogleOAuthUrl,
        setOAuthSession,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};

type SupabaseProviderProps = {
  children: React.ReactNode;
};

declare module 'jwt-decode' {
  export interface JwtPayload {
    email: string;
  }
}