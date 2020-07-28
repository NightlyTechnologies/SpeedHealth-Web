import styled, { css } from 'styled-components';

import background from '../../assets/background.png';

import { Modal } from '.';

interface ModalProps {
  modal?: Modal;
}

export const Container = styled.div`
  background: url(${background}) repeat left top,
    linear-gradient(140deg, var(--primary) 25%, var(--secundary) 90%);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div<ModalProps>`
  background: var(--white);
  border-radius: 10px;
  width: 420px;
  height: 650px;
  display: flex;
  align-items: center;
  box-shadow: 0px 10px 4px rgba(0, 0, 0, 0.25);
  ${props =>
    props.modal === 'signup' &&
    css`
      height: 750px;
      justify-content: center;
    `}
`;