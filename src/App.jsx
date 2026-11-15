
import { useEffect, useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import outputs from '../amplify_outputs.json';
import './App.css';

Amplify.configure(outputs);

const client = generateClient();

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <UserProfile user={user} signOut={signOut} />
      )}
    </Authenticator>
  );
}

function UserProfile({ user, signOut }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const result = await client.models.UserProfile.list();
        const profile = result.data?.[0];

        if (profile) {
          setEmail(profile.email);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    }

    loadProfile();
  }, []);

  return (
    <main>
      <h1>Amey Joseph's Web Application</h1>
      <h2>Welcome to my AWS Amplify project!</h2>
      <p>Created for my web application assignment.</p>

      <h3>User Profile</h3>
      <p>Email: {email || user?.signInDetails?.loginId || 'Loading...'}</p>

      <button onClick={signOut}>Sign Out</button>
    </main>
  );
}

export default App;
