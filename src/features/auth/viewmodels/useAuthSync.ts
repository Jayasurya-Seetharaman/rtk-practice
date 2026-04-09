import { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { setAuth, clearAuth, setLoading } from '../models/authSlice';
import { selectAuthUser } from '../models/selectors';
import type { UserRole } from '../models/types';

export function useAuthSync() {
  const { authState, oktaAuth } = useOktaAuth();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  useEffect(() => {
    const syncAuth = async () => {
      try {
        if (authState?.isAuthenticated) {
          if (!user) {
            const userInfo = await oktaAuth.getUser();
            dispatch(
              setAuth({
                name: userInfo.name ?? '',
                email: userInfo.email ?? '',
                sub: userInfo.sub ?? '',
                user_role: (userInfo.user_role as UserRole) ?? 'viewer',
              })
            );
          } else {
            dispatch(setLoading(false));
          }
        } else if (authState && !authState.isAuthenticated) {
          dispatch(clearAuth());
        }
      } catch {
        // Token expired or 401 — treat as logged out
        dispatch(clearAuth());
      }
    };

    if (authState) {
      syncAuth();
    } else {
      dispatch(setLoading(true));
    }
  }, [authState, oktaAuth, dispatch, user]);
}
