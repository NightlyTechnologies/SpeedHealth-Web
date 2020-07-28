import styled, { css } from 'styled-components';

interface ButtonProps {
  width?: string;
}

export const Container = styled.button<ButtonProps>`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background: linear-gradient(140deg, var(--primary) 25%, var(--secundary) 90%);
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--white);
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
  }

  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}
`;