import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface ILinkProps {
  children: React.ReactNode;
  to: string;
  [key: string]: any;
}

export const Link = ({ children, to, ...props }: ILinkProps) => (
  <RouterLink to={to} {...props}>
    {children}
  </RouterLink>
);
