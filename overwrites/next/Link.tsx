import * as React from 'react';
import NextLink from 'next/link';

interface IProps {
  children: React.ReactNode;
  to: string;
}

export const Link = ({ children, to, ...passProps }: IProps) => (
  <NextLink href={to}>
    <a {...passProps}>{children}</a>
  </NextLink>
);
