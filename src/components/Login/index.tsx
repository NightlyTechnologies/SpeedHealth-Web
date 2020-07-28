import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSession } from '../../hooks/session';
import { useAuth } from '../../hooks/auth';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/GetValidationErrors';

import Input from '../Input';
import Button from '../Button';

import logo from '../../assets/logo.png';

import { FiMail, FiLock } from 'react-icons/fi';

import {
  Container,
  Name,
  ModalToggler,
  Form,
  Inputs,
} from './styles';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { handleSignUpModal } = useSession();
  const { signIn } = useAuth();

  const handleSubmitLogin = useCallback(
    async (formData: LoginFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail is required')
            .email('Type a valid e-mail'),
          password: Yup.string().min(6, 'At least 6 digits'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        signIn({
          email: formData.email,
          password: formData.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [signIn, history],
  );

  return (
    <Container>
      <img src={logo} alt="Logo" />
      <Name>Speed Health</Name>
      <p>
        Don't have an account?{' '}
        <ModalToggler onClick={handleSignUpModal}>Sign Up!</ModalToggler>
      </p>
      <Form ref={formRef} onSubmit={handleSubmitLogin}>
        <Inputs>
          <Input name="email" placeholder="E-Mail" icon={FiMail} type="email" />
          <Input
            name="password"
            placeholder="Password"
            icon={FiLock}
            type="password"
          />
        </Inputs>
        <Button text="Login" />
      </Form>
    </Container>
  );
};

export default Login;