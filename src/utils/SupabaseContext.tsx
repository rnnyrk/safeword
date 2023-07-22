import type * as i from 'types';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import jwt_decode, { JwtPayload } from 'jwt-decode';

import { getUserByEmail } from 'queries/users';
import { createUser } from 'queries/users/mutate';

import { supabase } from './supabase';

type UserType = i.User | null | undefined;

type SupabaseContextProps = {
  loggedIn: boolean;
  user: UserType;
  setUser: (user: UserType) => void;
  signOut: () => Promise<void>;
  getAppleOAuthUrl: () => Promise<string | null>;
  getGoogleOAuthUrl: () => Promise<string | null>;
  setOAuthSession: (tokens: { access_token: string; refresh_token: string }) => Promise<void>;
};

export const SupabaseContext = createContext<SupabaseContextProps>({
  loggedIn: false,
  user: null,
  setUser: () => {},
  signOut: async () => {},
  getAppleOAuthUrl: async () => '',
  getGoogleOAuthUrl: async () => '',
  setOAuthSession: async () => {},
});

export function useSupabase() {
  return useContext(SupabaseContext);
}

function useProtectedRoute(user: UserType) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return;

    const rootSegment = segments[0];
    const isAppDir = rootSegment === undefined;

    // If the user is not signed in, and not on signin page
    if (!user) {
      router.replace('/');
    } else if (user && isAppDir) {
      if (user.group_1) {
        router.replace('/home/');
      } else {
        router.replace('/onboarding/');
      }
    }
  }, [user, segments]);
}

export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>(undefined);

  async function getSupabaseUser(token: string) {
    const decodedToken = jwt_decode(token) as JwtPayload;
    if (!decodedToken.sub) throw new Error('No user id found in token');

    const email = decodedToken.email;
    let name =
      decodedToken.user_metadata?.full_name ||
      decodedToken.user_metadata?.name ||
      decodedToken?.name;

    if (!name) {
      name = email.split('@')[0];
    }

    // Fetch user, is not existing, create the
    const { data, error } = await getUserByEmail(email);

    if (data) {
      setUser(data);
    } else if (!data) {
      const { data: newUser, error: newUserError } = await createUser({
        id: decodedToken.sub,
        email,
        name,
      });

      if (newUser && !newUserError) {
        setUser(newUser[0]);
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
        redirectTo: 'com.safeword://',
        scopes: 'full_name email',
      },
    });

    return result.data.url;
  }

  async function getGoogleOAuthUrl(): Promise<string | null> {
    const result = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'com.safeword://',
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

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    setUser(null);
    setLoggedIn(false);

    if (error) throw error;
  }

  useProtectedRoute(user);

  return (
    <SupabaseContext.Provider
      value={{
        loggedIn,
        user,
        setUser,
        signOut,
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
    name?: string;
    user_metadata?: Record<string, any>;
  }
}
