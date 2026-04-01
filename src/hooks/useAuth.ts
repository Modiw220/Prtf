import { useContext } from 'react';
import { AuthContext } from '../components/auth/AuthContext';

export function useAuth() {
  return useContext(AuthContext);
}
