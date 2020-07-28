import React, { createContext, useCallback, useState, useContext } from 'react';
import { api } from '../services/api';

interface Pharmacy {
  id: string;
  email: string;
  avatar_url: string;
  name: string;
}

interface AuthState {
  token: string;
  pharmacy: Pharmacy;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  pharmacy: Pharmacy;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updatePharmacy(pharmacy: Pharmacy): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@SpeedHealth:token');
    const pharmacy = localStorage.getItem('@SpeedHealth:pharmacy');

    if (token && pharmacy) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, pharmacy: JSON.parse(pharmacy) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('session/create', {
      email,
      password,
    });

    const { token, pharmacy } = response.data;

    localStorage.setItem('@SpeedHealth:token', token);
    localStorage.setItem('@SpeedHealth:pharmacy', JSON.stringify(pharmacy));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, pharmacy });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SpeedHealth:token');
    localStorage.removeItem('@SpeedHealth:pharmacy');

    setData({} as AuthState);
  }, []);

  const updatePharmacy = useCallback(
    (pharmacy: Pharmacy) => {
      localStorage.setItem('@SpeedHealth:pharmacy', JSON.stringify(pharmacy));

      setData({
        token: data.token,
        pharmacy,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ pharmacy: data.pharmacy, signIn, signOut, updatePharmacy }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}