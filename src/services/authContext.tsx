import React from 'react';
import { useRouter, useSegments } from 'expo-router';

const AuthContext = React.createContext<AuthContextProps>(null);

type AuthContextProps = {
  signIn: () => void;
  signOut: () => void;
  user: any;
} | null;

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/sign-in');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/');
    }
  }, [user, segments]);
}

export function AuthProvider(props: any) {
  const [user, setAuth] = React.useState<{} | null>(null);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setAuth({}),
        signOut: () => setAuth(null),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
