import styled, { css } from 'styled-components';

import { Form as Unform } from '@unform/web';

interface GeolocationProps {
  error?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 40px 40px;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Logo = styled.img`
  width: 30%;
`;

export const HeaderTexts = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const CreateAccount = styled.p`
  font-weight: bold;
`;

export const Name = styled.h1`
  font-size: 2.4rem;
  padding: 0;
  margin-top: 4px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GeolocationSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 98%;
`;

export const GeolocationTexts = styled.span<GeolocationProps>`
  font-weight: bold;
  ${props =>
    props.error &&
    css`
      color: var(--red);
    `}
`;