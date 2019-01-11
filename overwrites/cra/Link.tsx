import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface ILinkProps {
  children?: React.ReactNode;
  [key: string]: any;
}

export const Link = ({ children, ...props }: ILinkProps) => {
  const child = React.Children.only(children);
  return (
    <RouterLink {...props}>
      {child.props.children}
    </RouterLink>
  );
};
