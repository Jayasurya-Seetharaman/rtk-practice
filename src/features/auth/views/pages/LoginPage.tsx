import { Navigate } from 'react-router-dom';
import { useAuthVM } from '../../viewmodels/useAuthVM';

export const LoginPage = () => {
  const { isAuthenticated, isLoading, login } = useAuthVM();

  if (isLoading) return <div>Loading...</div>;
  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>RTK Practice</h1>
        <p>Please log in to continue</p>
        <button onClick={login}>Log in with Okta</button>
      </div>
    </div>
  );
};