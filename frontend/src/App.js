import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Preferences from './pages/Preferences';
import Billing from './pages/Billing';

const MainContent = styled.main`
  display: flex;
  height: 100vh;
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
      const response = await fetch('/status');
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
      <Header onLogout={handleUserLogout} />
      <Switch>
        {/* Route for Login */}
        <Route path="/login">
          {isAuthenticated ? (<Redirect to='/' />) : (<Login onLogin={handleUserLogin} />)}
        </Route>

        {/* Main App Route */}
        <Route path="/" exact>
          {isAuthenticated ? (
            <MainContent>
              <Sidebar />
              <div>Welcome, {user}!</div>
            </MainContent>
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
