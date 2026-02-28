import { useAuthContext } from '../context/AuthContext';

export function useSession() {
  const { session, isLoading } = useAuthContext();
  return { session, isLoading };
}

export default useSession;
