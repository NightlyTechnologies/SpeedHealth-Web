import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface InputProps {
  isFocused: boolean;
  isFilled: boolean;
}

interface ContainerProps {
  isErrored: boolean;
  width?: string;
}

export const Container = styled.div<ContainerProps>`
  border-bottom: 3px solid;
  border-image: linear-gradient(
      140deg,
      var(--primary) 25%,
      var(--secundary) 90%
    )
    1;
  width: 98%;
  margin-bottom: 15px;
  display: flex;
  padding: 15px;
  align-items: center;
  position: relative;
  ${props =>
    props.isErrored &&
    css`
      border-bottom: 3px solid var(--red);
      border-image: none;
    `}
  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}
`;

export const Placeholder = styled.span<InputProps>`
  position: absolute;
  left: 51px;
  color: var(--gray);
  pointer-events: none;
  user-select: none;
  transition: 0.2s;
  ${props =>
    (props.isFocused || props.isFilled) &&
    css`
      transform: translateY(-25px);
      font-size: 1.2rem;
      color: var(--primary);
    `}
`;

export const TextInput = styled.input`
  flex: 1;
  width: 100%;
  font-size: 1.5rem;
  padding: 0 0 0 15px;
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: var(--red);
    color: #fff;
    &:before {
      border-color: var(--red) transparent;
    }
  }
`;