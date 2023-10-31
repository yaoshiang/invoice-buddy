import styled from 'styled-components';

const SideNav = styled.nav`
  width: 200px;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

export default function Sidebar() {
  return (
    <SideNav>
      <p>Link 1</p>
      <p>Link 2</p>
      <p>Link 3</p>
    </SideNav>
  );
}
