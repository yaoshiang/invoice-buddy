import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
const HeaderBar = styled.header`
  background: linear-gradient(90deg, #505080, #401010);  
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AccountContainer = styled.div`
  position: relative;
`;

const AccountButton = styled.button`
  background-color: #555;
  padding: 5px 15px;
  border: none;
  color: white;
`;


const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #555;
  border: 0px solid #ddd;
  width: 150px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;


const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`;


export default function Header({ onLogout }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const history = useHistory(); // Instantiate the hook

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.success) {
      setDropdownVisible(false);
      onLogout();
    } else {
      alert(data.message);
    }
  };

  const navToPrefs = () => {
    setDropdownVisible(false);
    history.push('/preferences'); // Navigate to preferences page
  };

  const navToBilling = () => {
    setDropdownVisible(false);
    history.push('/billing'); // Navigate to billing page
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <HeaderBar>
      <h1>Product Manager CoPilot</h1>
      <AccountContainer ref={dropdownRef}>
        <AccountButton onClick={() => setDropdownVisible(!dropdownVisible)}>Account</AccountButton>
        {dropdownVisible && (
          <DropdownMenu>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            <DropdownItem onClick={navToPrefs}>Preferences</DropdownItem>
            <DropdownItem onClick={navToBilling}>Billing</DropdownItem>
          </DropdownMenu>
        )}
      </AccountContainer>
    </HeaderBar>
  );
}