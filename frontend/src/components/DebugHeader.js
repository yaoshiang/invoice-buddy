import React from 'react';
import styled, { keyframes } from 'styled-components';


const cycleColors = keyframes`
  0% { background-color: white; }
  100% { background-color: yellow;}
`;

const DebugHeaderContainer = styled.div`
  background-color: red;
  color: red;
  text-align: center;
  padding: 10px;
  font-size: 16px;
  animation: ${cycleColors} 5s linear infinite;
`;

const DebugHeader = ({ children }) => {
  return <DebugHeaderContainer>{children}</DebugHeaderContainer>;
};

export default DebugHeader;
