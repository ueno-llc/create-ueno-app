import * as React from 'react';
import GsapDevTools from 'gsap-tools';

import { useKeyDown } from 'hooks/use-keydown';
import { useLocalStorage } from 'hooks/use-localstorage';

import s from './GsapTools.scss';

interface IGsapToolsProps {
  button: boolean;
}

const LOCAL_STORAGE_GSAPTOOLS = '_uenoDevtoolsGsapTools';

export const GsapTools = ({ button }: IGsapToolsProps) => {
  const [isVisible, setVisible] = useLocalStorage(LOCAL_STORAGE_GSAPTOOLS, false);
  const keys = useKeyDown();

  const onToggleGsapTools = () => {
    setVisible(!isVisible);
  };

  React.useEffect(() => {
    if (keys.includes(17) && keys.includes(71)) {
      onToggleGsapTools();
    }
  }, [keys]);

  return (
    <>
      {button && (
        <button className={s(s.button, { visible: isVisible })} onClick={onToggleGsapTools}>
          GSAP
        </button>
      )}

      <GsapDevTools
        onClick={onToggleGsapTools}
        isVisible={isVisible}
        isFixed
      />
    </>
  );
};
