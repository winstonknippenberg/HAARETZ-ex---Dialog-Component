import { hideOthers, Undo } from 'aria-hidden';
import { useCallback, useRef } from 'react';

//useCallback with ref and cleanup is still a mystery but I managed to make it work with this article:
//https://medium.com/welldone-software/usecallback-might-be-what-you-meant-by-useref-useeffect-773bc0278ae

export const useAriaHidden = () => {
  let unHide: Undo;
  const nodeRef = useRef<HTMLElement>(null);

  const setOverlayRef = useCallback((newNode: HTMLElement) => {
    if (nodeRef.current) {
      unHide();
    }

    nodeRef.current = newNode;

    if (nodeRef.current) {
      unHide = hideOthers(nodeRef.current);
    }
  }, []);

  return setOverlayRef;
};
