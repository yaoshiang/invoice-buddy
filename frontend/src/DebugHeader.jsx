// DebugHeader.js
import React from 'react';
import { Container } from 'react-bootstrap';

function DebugHeader({ debugInfo }) {
  return (
    <Container className="bg-light p-2" style={{ color: 'red' }}>
      <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
    </Container>
  );
}

export default DebugHeader;
