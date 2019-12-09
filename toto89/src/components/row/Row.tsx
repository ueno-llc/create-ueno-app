import * as React from 'react';

import s from './Row.scss';

interface IRowProps {
  children: React.ReactNode;
}

export const Row = ({ children }: IRowProps) => (
  <div className={s.row}>
    {children}
  </div>
);
