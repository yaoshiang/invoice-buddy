import React from 'react';
import { Navbar, Container } from 'react-bootstrap';


const Header = ({ userName }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">LexIntel</Navbar.Brand>
        Logged in as: {userName}
      </Container>
    </Navbar>
  );
};

export default Header;