import { useEffect, useCallback } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { setAuth, clearAuth, setLoading } from '../models/authSlice';
import { selectAuthUser, selectIsAuthenticated, selectAuthLoading, selectAuthError } from '../models/selectors';

export const useAuthVM = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  // sync Okta auth state → Redux store
  useEffect(() => {
    const syncAuth = async () => {
      if (authState?.isAuthenticated) {
        const userInfo = await oktaAuth.getUser();
        dispatch(
          setAuth({
            name: userInfo.name ?? '',
            email: userInfo.email ?? '',
            sub: userInfo.sub ?? '',
          })
        );
      } else if (authState && !authState.isAuthenticated) {
        dispatch(clearAuth());
      }
    };

    if (authState) {
      syncAuth();
    } else {
      dispatch(setLoading(true));
    }
  }, [authState, oktaAuth, dispatch]);

  const login = useCallback(async () => {
    await oktaAuth.signInWithRedirect();
  }, [oktaAuth]);

  const logout = useCallback(async () => {
    await oktaAuth.signOut();
    dispatch(clearAuth());
  }, [oktaAuth, dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  };
};