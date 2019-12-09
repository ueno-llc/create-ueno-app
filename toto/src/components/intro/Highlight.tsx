import * as React from 'react';

import s from './Highlight.scss';

interface IHighlightProps {
  children: string;
}

export const Highlight = ({ children }: IHighlightProps) => {
  const renderWords = () => {
    const words = children.split(' ');
    const { length } = words;

    return words.map((word, index) => (
      <span key={word} className={s(s.highlight, { isFirst: length > 1 && index === 0 })}>
        <span className={s.highlight__text}>{word}</span>
        <span className={s.highlight__color} />
      </span>
    ));
  };

  return (
    <>
      {renderWords()}
    </>
  );
};
