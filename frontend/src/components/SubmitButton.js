
import styled from 'styled-components';

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: #411;
  border-radius: 5px;
  background-color: #522;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;

  &:hover {
    background-color: #411;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.5);
  }
`;

export default SubmitButton