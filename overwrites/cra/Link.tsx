import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Link = ({ children, ...props }: any) => (
  <RouterLink {...props}>
    {children}
  </RouterLink>
);
