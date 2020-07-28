import React from 'react';
import {
  useEffect,
  useCallback,
  useState,
  useRef,
  InputHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

import {
  Container,
  Placeholder,
  TextInput,
  Error,
} from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  icon: React.ComponentType<IconBaseProps>;
  width?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  placeholder,
  width,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setisFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setisFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} width={width}>
      <Icon
        style={{ transition: '0.2s' }}
        size={22}
        color={
          error
            ? 'var(--red)'
            : isFocused || isFilled
            ? '#22DAAE'
            : 'var(--gray)'
        }
      />
      <Placeholder isFocused={isFocused} isFilled={isFilled}>
        {placeholder}
      </Placeholder>
      <TextInput
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="var(--red)" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;