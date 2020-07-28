import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSession } from '../../hooks/session';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/GetValidationErrors';

import { api } from '../../services/api';

import Input from '../Input';
import Button from '../Button';

import logo from '../../assets/logo.png';

import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiArrowRight,
  FiCheckCircle,
} from 'react-icons/fi';
import { FaRegAddressCard } from 'react-icons/fa';
import { IoMdPin } from 'react-icons/io';

import {
  Container,
  Header,
  Logo,
  HeaderTexts,
  CreateAccount,
  Name,
  ModalToggler,
  Form,
  Inputs,
  GeolocationSection,
  GeolocationTexts,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  whatsapp: number;
  cnpj: number;
}

const SignUp: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { data, handleLoginModal, handleOpenGeolocation } = useSession();
  const [geolocationIsNull, setGeolocationIsNull] = useState(false);

  const handleSubmitSignUp = useCallback(
    async (formData: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .required('E-mail is required')
            .email('Type a valid e-mail'),
          password: Yup.string().min(6, 'At least 6 digits'),
          password_confirmation: Yup.string()
            .oneOf([Yup.ref('password')], 'Confirmation incorrect')
            .required('Password confirmation is required'),
          whatsapp: Yup.string().min(9, 'Phone must have 9 numbers'),
          cnpj: Yup.string()
            .min(5, 'CPNJ must have 5 numbers')
            .required('CNPJ is required'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        if (data.geolocation[0] !== 0) {
          setGeolocationIsNull(false);
          await api.post('pharmacys', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            whatsapp: formData.whatsapp,
            cnpj: formData.cnpj,
            uf: data.selectedUf,
            city: data.selectedCity,
            geolocation: data.geolocation,
          });

          history.push('/dashboard');
        } else {
          setGeolocationIsNull(true);
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [data.geolocation, data.selectedUf, data.selectedCity, history],
  );

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="Logo" />
        <HeaderTexts>
          <CreateAccount>Create an account on</CreateAccount>
          <Name>Speed Health</Name>
        </HeaderTexts>
      </Header>
      <p>
        Already have an account?{' '}
        <ModalToggler onClick={handleLoginModal}>Login!</ModalToggler>
      </p>
      <Form ref={formRef} onSubmit={handleSubmitSignUp}>
        <Inputs>
          <Input name="name" placeholder="Name" icon={FiUser} />
          <Input name="email" placeholder="E-Mail" icon={FiMail} type="email" />
          <Input
            name="password"
            placeholder="Password"
            icon={FiLock}
            type="password"
          />
          <Input
            name="password_confirmation"
            placeholder="Confirm password"
            icon={FiLock}
            type="password"
          />
          <Input name="whatsapp" placeholder="Phone" icon={FiPhone} />
          <Input name="cnpj" placeholder="CNPJ" icon={FaRegAddressCard} />
        </Inputs>
        {!data.geolocationModal ? (
          <GeolocationSection>
            {data.geolocation[0] === 0 ? (
              <>
                <GeolocationTexts error={geolocationIsNull}>
                  Click to change the
                  <br />
                  location
                </GeolocationTexts>
                <Button
                  onClick={handleOpenGeolocation}
                  icon={IoMdPin}
                  width="22%"
                />
              </>
            ) : (
              <>
                <GeolocationTexts>Location confirmed!</GeolocationTexts>
                <FiCheckCircle size={40} color="#22DAAE" />
              </>
            )}
          </GeolocationSection>
        ) : (
          <GeolocationSection>
            <GeolocationTexts>
              Choose your
              <br />
              location
            </GeolocationTexts>
            <FiArrowRight size={40} color="#22DAAE" />
          </GeolocationSection>
        )}
        <Button text="Register" />
      </Form>
    </Container>
  );
};

export default SignUp;