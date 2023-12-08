import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

import DebugHeader from './DebugHeader';

function LoginForm({ onLogin, username, setUsername, password, setPassword }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <DebugHeader debugInfo={"DEBUGGING INFO: Login with any user name / pw for now."} />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form onSubmit={onLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* <Form.Label>Username</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );

}
export default LoginForm