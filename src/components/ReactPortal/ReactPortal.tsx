import { useState, useLayoutEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ReactPortalProps {
  wrapperId?: string;
  children: ReactNode;
  container?: HTMLElement;
}

const createWrapperAndAppend = ({
  wrapperId,
  container,
}: Omit<ReactPortalProps, 'children'>): HTMLDivElement => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  if (container) {
    container.appendChild(wrapperElement);
  } else {
    document.body.appendChild(wrapperElement);
  }
  return wrapperElement;
};

function ReactPortal({
  children,
  wrapperId = 'dialogWrapper',
  container,
}: ReactPortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let divCreated = false;
    if (!element) {
      divCreated = true;
      element = createWrapperAndAppend({ wrapperId, container });
    }
    setWrapperElement(element);

    return () => {
      if (divCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) {
    return null;
  } else {
    return createPortal(children, wrapperElement);
  }
}

export default ReactPortal;
