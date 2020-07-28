import styled from 'styled-components';

import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 40px 40px;
  height: 100%;
`;

export const Name = styled.h1`
  font-size: 3rem;
  padding: 30px 0 20px;
  color: var(--primary);
`;

export const ModalToggler = styled.button`
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--primary);
  cursor: pointer;
`;

export const Form = styled(Unform)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Inputs = styled.div`
  padding: 0 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;