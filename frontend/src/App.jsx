import { useState, useEffect } from 'react'

// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

import styled from 'styled-components';

import LoginForm from './LoginForm';
import DebugHeader from './DebugHeader';
import ChatWindow from './ChatWindow';
import DocumentEditor from './DocumentEditor';
import Header from './Header';

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'



const GridContainer = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
    width: 100%;
`;

const HeaderSection = styled.div`
    grid-column: 1 / -1;
    /* Additional styling for your header */
`;

const ChatWindowSection = styled.div`
    overflow: hidden; 
    display: flex; 
    flex-direction: column;
    /* Additional styling for chat window */
`;

const DocumentEditorSection = styled.div`
    overflow: hidden; 
    display: flex; 
    flex-direction: column;
    /* Additional styling for document editor */
`;

const ScrollableContent = styled.div`
    max-height: 100%;
    overflow: auto;
    /* Additional styling for scrollable content */
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  // Check login status
  useEffect(() => {
    fetch('/api/status')
      .then(response => response.json())
      .then(data => {
        setIsLoggedIn(data.is_authenticated);
        setUser(data.user || '');
      });
  }, []);


  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setIsLoggedIn(true);
          setUser(username);
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Login failed. Please try again.");
      });
  };


  // Handle logout
  const handleLogout = () => {
    fetch('/api/logout')
      .then(response => response.json())
      .then(data => {
        setIsLoggedIn(false);
        setUser('');
      });
  };


  return (
    <div className="top-aligned-div">
      {!isLoggedIn ? (
        <LoginForm
          onLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <GridContainer>
          <HeaderSection>
            <DebugHeader debugInfo={"DEBUGGING INFO: This is just HTML/CSS, not backend logic yet."} />
            <Header userName={username} />
          </HeaderSection>
          <ChatWindowSection>
            <ChatWindow />
          </ChatWindowSection>
          <DocumentEditorSection>
            <DocumentEditor />
          </DocumentEditorSection>
        </GridContainer>
      )}
    </div>
  );
}

export default App;