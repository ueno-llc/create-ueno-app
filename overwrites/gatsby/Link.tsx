import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';

interface IProps {
  children: React.ReactNode;
  to: string;
}

export const Link = ({ children, to, ...props }: IProps) => (
  <GatsbyLink to={to} {...props}>
    {children}
  </GatsbyLink>
);
