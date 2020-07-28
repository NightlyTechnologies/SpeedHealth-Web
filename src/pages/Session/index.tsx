import React, { useEffect, useState } from 'react';

import { useSession } from '../../hooks/session';

import { ibgeapi } from '../../services/api';

import Login from '../../components/Login';
import SignUp from '../../components/SignUp';
import Geolocation from '../../components/Geolocation';

import { Container, ModalContainer } from './styles';

export type Modal = 'login' | 'signup';

interface Uf {
  sigla: string;
}

const Session: React.FC = () => {
  const { data } = useSession();
  const [ufsInitials, setUfsInitials] = useState<string[]>([]);

  useEffect(() => {
    async function loadUfsInitials(): Promise<void> {
      const response = await ibgeapi.get('/');

      const ufs: Uf[] = response.data;

      const ufsInitials = ufs.map(uf => uf.sigla);

      setUfsInitials(ufsInitials);
    }

    loadUfsInitials();
  }, []);

  return (
    <Container>
      <ModalContainer modal={data.modal}>
        {data.modal === 'login' ? <Login /> : <SignUp />}
      </ModalContainer>
      {data.geolocationModal && <Geolocation ufsInitials={ufsInitials} />}
    </Container>
  );
};

export default Session;