import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';

export const Link = ({ children, ...props }: any) => (
  <GatsbyLink {...props}>
    {children}
  </GatsbyLink>
);
