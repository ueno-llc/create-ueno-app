import * as React from 'react';
import NextLink from 'next/link';

interface ILinkProps {
  children: React.ReactNode;
  to: string;
  [key: string]: any;
}

export const Link = ({ children, to, ...props }: ILinkProps) => (
  <NextLink href={to}>
    <a {...props}>{children}</a>
  </NextLink>
);
