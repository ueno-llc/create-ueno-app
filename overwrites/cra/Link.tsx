import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Link = ({ children, ...props }: any) => {
  const child = React.Children.only(children);
  return (
    <RouterLink {...props}>
      {child.props.children}
    </RouterLink>
  );
};
