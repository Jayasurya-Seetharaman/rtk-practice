import { useAuthVM } from '../../viewmodels/useAuthVM';

export const ProfilePage = () => {
  const { user, logout } = useAuthVM();

  if (!user) return null;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Okta ID:</strong> {user.sub}</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
};