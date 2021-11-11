import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

export type ButtonProps = { variant?: 'primary' | 'secondary'; text: string };

const StyledButton = styled.button<Omit<ButtonProps, 'text'>>`
  background-color: #2e8b57;
  border: none;
  cursor: pointer;
  border-radius: 16px;
  padding: 18px 24px;

  ${({ variant }) => variant === 'primary' && `background-color: #FFEFD5`}

  ${({ variant }) => variant === 'secondary' && `background-color: #FA8072`}
`;

export const Button = ({ variant, text }: PropsWithChildren<ButtonProps>) => (
  <StyledButton variant={variant}>{text}</StyledButton>
);
