import { LoginCallback as OktaLoginCallback } from '@okta/okta-react';

export const LoginCallback = () => {
  return <OktaLoginCallback errorComponent={({ error }) => <div>Error: {error.message}</div>} />;
};