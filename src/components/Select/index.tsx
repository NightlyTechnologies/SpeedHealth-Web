import React from 'react';
import { SelectHTMLAttributes, useRef, useState, useCallback } from 'react';

import { IconBaseProps } from 'react-icons';

import {
  Container,
  SelectElement,
  Placeholder,
} from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  icon: React.ComponentType<IconBaseProps>;
  width?: string;
  placeholder: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  icon: Icon,
  width,
  placeholder,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setisFilled] = useState(false);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);

    setisFilled(!!selectRef.current?.value);
  }, []);

  return (
    <Container width={width}>
      <Icon
        style={{ transition: '0.2s' }}
        size={22}
        color={isFocused || isFilled ? '#22DAAE' : 'var(--gray)'}
      />
      <Placeholder isFocused={isFocused} isFilled={isFilled}>
        {placeholder}
      </Placeholder>
      <SelectElement
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
        ref={selectRef}
        {...rest}
      >
        <option value="" disabled>
          {' '}
        </option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </SelectElement>
    </Container>
  );
};

export default Select;