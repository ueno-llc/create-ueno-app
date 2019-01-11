import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

interface ILinkProps {
  children?: React.ReactNode;
  [key: string]: any;
}

export const Link = ({ children, ...props }: ILinkProps) => {
  const child = React.Children.only(children);
  return (
    <GatsbyLink {...props}>
      {child.props.children}
    </GatsbyLink>
  );
};
