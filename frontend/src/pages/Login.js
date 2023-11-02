import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import SubmitButton from '../components/SubmitButton';


const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
`;

export default function Login({ onLogin }) {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });


      const data = await response.json();
      if (data.success) {
        console.log("Successfully logged in! calling onLogin callback...")
        onLogin();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <LoginPage>
      <h1>Login</h1>
      <LoginForm onSubmit={e => e.preventDefault()}>  {/* Prevent default form submission */}
        <Input
          type="text"
          placeholder="Username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}  // Update state on input change
        />
        <Input type="password" placeholder="Password" onChange={(e) => setPasswordInput(e.target.value)} />
        <SubmitButton type="button" onClick={handleLogin}>Login</SubmitButton>
      </LoginForm>
      <div>
        <Button>OAuth Option 1</Button>
        <Button>OAuth Option 2</Button>
      </div>
      <Button>Forgot Password?</Button>
    </LoginPage>
  );
}


