import React from 'react';
import NextLink from 'next/link';

export const Link = (props: any) => {
  const { to, ...passProps } = props;
  return React.createElement(NextLink, {
    href: to,
    ...passProps,
  });
}
