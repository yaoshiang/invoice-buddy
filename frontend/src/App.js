import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Preferences from './pages/Preferences';
import Billing from './pages/Billing';
import Form from './pages/Form';
import DebugHeader from './components/DebugHeader';

const MainContent = styled.main`
  display: flex;
  height: 100vh;  
`;

const Spacer = styled.div`
  width: 100px;
`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleUserLogin = () => {
    checkAuthStatus();
  };

  const handleUserLogout = () => {
    checkAuthStatus();
  };


  const checkAuthStatus = async () => {
    console.log('checking auth status...')
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      console.log(data)
      if (data.is_authenticated) {
        setIsAuthenticated(true);
        setUser(data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('There was a problem checking authentication status:', error);
      // Optionally, you can set some state here to show an error message to the user.
    }
  };


  return (
    <Router>
      <Switch>
        {/* Route for Login */}
        <Route path="/login">
          {isAuthenticated ? (<Redirect to='/' />) : (
            <div>
              <DebugHeader>Use any username/password, authentication is a placeholder for now.</DebugHeader>
              <Header onLogout={handleUserLogout} />
              <Login onLogin={handleUserLogin} />
            </div>)
          }
        </Route>

        {/* Main App Route */}
        <Route path="/" exact>
          {isAuthenticated ? (
            <div>
              <DebugHeader>This is a live call to open ai servers, with the response tokens streamed back for a ChatGPT-style UX. </DebugHeader>
              <Header onLogout={handleUserLogout} />
              <MainContent>
                <Sidebar />
                <Form />
                <Spacer />
              </MainContent>
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        {/* Preferences Route */}
        <Route path="/preferences" exact>
          {isAuthenticated ? <Preferences /> : <Redirect to="/login" />}
        </Route>

        {/* Billing Route */}
        <Route path="/billing" exact>
          {isAuthenticated ? <Billing /> : <Redirect to="/login" />}
        </Route>

        {/* Redirect any undefined routes */}
        <Redirect to={isAuthenticated ? '/' : '/login'} />
      </Switch>
    </Router>
  );


}

export default App;
