import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SideNav = styled.nav`
  background: linear-gradient(45deg, #202020, #303030);  
  width: 250px;
  height: 100vh;
  padding: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export default function Sidebar() {
  return (
    <SideNav>
      <StyledLink to="/">Step 1</StyledLink>
      <StyledLink to="/">Step 2</StyledLink>
      <StyledLink to="/">Step 3</StyledLink>
    </SideNav>
  );
}