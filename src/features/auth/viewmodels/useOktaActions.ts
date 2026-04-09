import { useCallback } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useAppDispatch } from '../../../app/store/hooks';
import { clearAuth } from '../models/authSlice';
import { useAlert } from '../../../app/context/AlertContext';

export const useOktaActions = () => {
  const { oktaAuth } = useOktaAuth();
  const dispatch = useAppDispatch();
  const { showAlert } = useAlert();

  const login = useCallback(async () => {
    await oktaAuth.signInWithRedirect();
  }, [oktaAuth]);

  const logout = useCallback(async () => {
    showAlert('success', 'You have been logged out');
    dispatch(clearAuth()); // update Redux immediately → ProtectedRoute redirects to /login
    await oktaAuth.signOut();
  }, [oktaAuth, dispatch, showAlert]);

  return { login, logout };
};
