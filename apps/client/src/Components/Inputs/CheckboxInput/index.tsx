import React, { FC } from 'react';

import { Container, Input } from './style';

export interface InputProps {
  label?: string;
  placeholder?: string;
  name: string;
  type?: string;
  width?: number;
  height?: number;
  value?: string;
  text?: string;
  inputMask?: string;
  inputRightSide?: boolean;
}

export const CheckboxInput: FC<InputProps> = ({
  label,
  type,
  placeholder,
  width,
  value,
  inputMask,
  text,
  height,
  children,
  ...props
}) => {
  let id = `${value}-checkbox`;

  return (
    <Container htmlFor={id}>
      <Input type="checkbox" id={id} {...props} value={value} />
      <div className="checkbox_input"></div>
      <span>{children ? children : label}</span>
    </Container>
  );
};
