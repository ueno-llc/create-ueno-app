import * as React from 'react';

import { Link } from 'components/link/Link';

import s from './Button.scss';

interface IButtonProps {
  to?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const Button = ({ to, children, className, disabled, ...rest }: IButtonProps) => {
  const passProps = { ...rest };
  const isLink = (typeof to !== 'undefined');
  const isExternal = isLink && /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(to || '');

  passProps.className = s(s.button, className, { disabled });

  if (isExternal) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={to}
        {...passProps}
      >
        {children}
      </a>
    );
  }

  if (isLink) {
    return (
      <Link
        to={to || '#'}
        {...passProps}
      >
        {children}
      </Link>
    );
  }

  passProps.disabled = disabled;

  return <button {...passProps}>{children}</button>;
};
