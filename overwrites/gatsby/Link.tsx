import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';

interface IProps {
  children: React.ReactNode;
}

export const Link = ({ children, ...props }: IProps) => (
  <GatsbyLink {...props}>
    {children}
  </GatsbyLink>
);
