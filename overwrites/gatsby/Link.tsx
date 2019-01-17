import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';

export const Link = ({ children, ...props }: any) => {
  const child = React.Children.only(children);

  return (
    <GatsbyLink {...props}>
      {child.props.children}
    </GatsbyLink>
  );
};
