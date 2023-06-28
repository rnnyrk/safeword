import * as i from 'types';
import * as React from 'react';
import { useRouter, useSegments } from 'expo-router';
import jwt_decode, { JwtPayload } from 'jwt-decode';

import { createNewUser, getUserByEmail } from 'queries/users';

import { SecureStoreAdapter } from './secureStore';

const AuthContext = React.createContext<AuthContextProps>(null);

export function useAuth() {
  return React.useContext(AuthContext);
}

function useProtectedRoute(user: i.User | null) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
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
  }, [user, segments]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<i.User | null>(null);

  React.useEffect(() => {
    console.log();

    // Check if the user jwt is still saved in secure store (current session)
    (async () => {
      const token = await SecureStoreAdapter.getItem('jwtToken');
      console.log('MOUNT AUTH PROVIDER', token);

      if (token) {
        const decodedToken = jwt_decode(token) as JwtPayload;
        const data = await getUserByEmail(decodedToken.email);
        setUser(data);
      }
    })();
  }, []);

  const signIn = async ({ email, token }: SignInPayload) => {
    SecureStoreAdapter.setItem('jwtToken', token);

    let userEmail = email;
    if (!userEmail) {
      const decodedToken = jwt_decode(token) as JwtPayload;

      console.log({
        decodedToken,
        email: decodedToken.email,
      });

      userEmail = decodedToken.email;
    }

    // Fetch user, is not existing, create, else set
    const data = await getUserByEmail(userEmail);

    if (data) {
      setUser(data);
    } else if (!data) {
      const { data: newUser, error: newUserError } = await createNewUser(userEmail);

      if (newUser && !newUserError) {
        setUser(newUser);
      } else if (newUserError) {
        console.error('Error creating new user', { newUserError });
      }
    }
  };

  const signOut = () => {
    SecureStoreAdapter.removeItem('jwtToken');
    setUser(null);
  };

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

declare module 'jwt-decode' {
  export interface JwtPayload {
    email: string;
  }
}

type SignInPayload = {
  email: string | null;
  token: string;
};

type AuthContextProps = {
  signIn: (payload: SignInPayload) => void;
  signOut: () => void;
  user: i.User | null;
} | null;
