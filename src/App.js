import React, { useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import awsConfig from './awsConfig';

Amplify.configure(awsConfig);

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [confirmationCode, setConfirmationCode] = useState(''); // New state for confirmation code
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false); // New state for confirmation step

  const handleSignUp = async () => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          given_name: givenName,
          family_name: familyName,
        },
      });
      alert('Sign-up successful! Please check your email for confirmation.');
      setIsConfirming(true); // Move to confirmation step
    } catch (err) {
      setError('Sign-up failed: ' + err.message);
    }
  };

  const handleConfirmSignUp = async () => { // New function to handle confirmation
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      alert('Confirmation successful! You can now sign in.');
      setIsConfirming(false); // Go back to sign-in
      setIsSignUp(false); // Switch to sign-in view
    } catch (err) {
      setError('Confirmation failed: ' + err.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await Auth.signIn(username, password);
      setLoggedIn(true);
    } catch (err) {
      setError('Sign-in failed: ' + err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
    } catch (err) {
      setError('Sign-out failed: ' + err.message);
    }
  };

  return (
    <div>
      {!loggedIn ? (
        <div>
          <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {isSignUp ? (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Given Name"
                value={givenName}
                onChange={(e) => setGivenName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Family Name"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleSignUp}>Sign Up</button>
              {isConfirming && ( // Show confirmation code input if confirming
                <>
                  <input
                    type="text"
                    placeholder="Confirmation Code"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                  />
                  <button onClick={handleConfirmSignUp}>Confirm Sign Up</button>
                </>
              )}
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleSignIn}>Sign In</button>
            </>
          )}
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      ) : (
        <div>
          <h1>Welcome, {username}!</h1>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default App;
