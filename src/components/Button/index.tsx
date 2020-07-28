import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ComponentType<IconBaseProps>;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon: Icon,
  width,
  ...rest
}) => {
  if (!Icon) {
    return (
      <Container width={width} {...rest}>
        {text}
      </Container>
    );
  }

  if (!text) {
    return (
      <Container width={width} {...rest}>
        <Icon size={28} color="var(--white)" />
      </Container>
    );
  }

  return (
    <Container width={width} {...rest}>
      {text}
      <Icon style={{ marginLeft: 18 }} size={28} color="var(--white)" />
    </Container>
  );
};

export default Button;