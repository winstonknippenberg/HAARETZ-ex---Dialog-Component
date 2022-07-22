import { hideOthers, Undo } from 'aria-hidden';
import { useCallback, useRef } from 'react';

export const useAriaHidden = () => {
  let unHide: Undo;
  const nodeRef = useRef<HTMLElement>(null);

  const setRef = useCallback((newNode: HTMLElement) => {
    if (nodeRef.current) {
      unHide();
    }

    nodeRef.current = newNode;

    if (nodeRef.current) {
      unHide = hideOthers(nodeRef.current);
    }
  }, []);

  return setRef;
};
