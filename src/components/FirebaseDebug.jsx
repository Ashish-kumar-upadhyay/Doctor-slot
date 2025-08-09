import React, { useState, useEffect } from 'react';
import { auth, db, testFirebaseConnection } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const FirebaseDebug = () => {
  const [connectionStatus, setConnectionStatus] = useState('testing...');
  const [testEmail] = useState('test@example.com');
  const [testPassword] = useState('test123456');
  const [authTest, setAuthTest] = useState('Not tested');
  const [firestoreTest, setFirestoreTest] = useState('Not tested');

  useEffect(() => {
    const testConnection = async () => {
      try {
        setConnectionStatus('Testing connection...');
        const isConnected = await testFirebaseConnection();
        setConnectionStatus(isConnected ? '✅ Connected' : '❌ Failed');
        setFirestoreTest(isConnected ? '✅ Firestore working' : '❌ Firestore failed');
      } catch (error) {
        setConnectionStatus('❌ Error: ' + error.message);
        setFirestoreTest('❌ Error: ' + error.message);
      }
    };

    testConnection();
  }, []);

  const testSignUp = async () => {
    try {
      setAuthTest('Testing signup...');
      const result = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
      setAuthTest('✅ Signup successful: ' + result.user.email);
    } catch (error) {
      console.error('Signup error:', error);
      let errorMsg = error.message;
      if (error.code === 'auth/email-already-in-use') {
        errorMsg = 'Email already exists (this is actually good - means Firebase Auth is working!)';
      }
      setAuthTest('❌ Signup: ' + errorMsg);
    }
  };

  const testSignIn = async () => {
    try {
      setAuthTest('Testing signin...');
      const result = await signInWithEmailAndPassword(auth, testEmail, testPassword);
      setAuthTest('✅ Signin successful: ' + result.user.email);
    } catch (error) {
      console.error('Signin error:', error);
      let errorMsg = error.message;
      if (error.code === 'auth/invalid-credential') {
        errorMsg = 'Invalid credentials (try signup first)';
      }
      setAuthTest('❌ Signin: ' + errorMsg);
    }
  };

  const retestConnection = async () => {
    setConnectionStatus('Retesting...');
    setFirestoreTest('Retesting...');
    try {
      const isConnected = await testFirebaseConnection();
      setConnectionStatus(isConnected ? '✅ Connected' : '❌ Failed');
      setFirestoreTest(isConnected ? '✅ Firestore working' : '❌ Firestore failed');
    } catch (error) {
      setConnectionStatus('❌ Error: ' + error.message);
      setFirestoreTest('❌ Error: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px' }}>
      <h2>🔥 Firebase Debug Panel</h2>
      
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Connection Status</h3>
        <p><strong>Overall:</strong> {connectionStatus}</p>
        <p><strong>Firestore:</strong> {firestoreTest}</p>
        <button onClick={retestConnection} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Retest Connection
        </button>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Authentication Test</h3>
        <p><strong>Test Email:</strong> {testEmail}</p>
        <p><strong>Status:</strong> {authTest}</p>
        <div>
          <button onClick={testSignUp} style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Test Sign Up
          </button>
          <button onClick={testSignIn} style={{ padding: '8px 16px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Test Sign In
          </button>
        </div>
      </div>

      <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Firebase Services Status</h3>
        <p><strong>Auth:</strong> {auth ? '✅ Initialized' : '❌ Not initialized'}</p>
        <p><strong>Firestore:</strong> {db ? '✅ Initialized' : '❌ Not initialized'}</p>
        <p><strong>Project ID:</strong> {auth?.app?.options?.projectId || 'Not available'}</p>
        <p><strong>Auth Domain:</strong> {auth?.app?.options?.authDomain || 'Not available'}</p>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h4>🔍 Troubleshooting Tips:</h4>
        <ul>
          <li>Check browser console for detailed error messages</li>
          <li>Ensure Firebase project is active in Firebase Console</li>
          <li>Verify Firestore is enabled in Firebase Console</li>
          <li>Check if localhost:5173 is added to authorized domains</li>
          <li>Make sure API keys are not restricted</li>
        </ul>
      </div>
    </div>
  );
};

export default FirebaseDebug;
