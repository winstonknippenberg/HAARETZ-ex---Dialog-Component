import * as FocusTrap from 'focus-trap-react';
import { useEffect, useMemo, useCallback, ReactElement } from 'react';
import { useAriaHidden } from '../hooks/useAriaHidden';
import { useDialogContext } from '../context/DialogContext';
import Dialog from './Dialog';

interface DialogLayoutProps {
  className?: string;
  children: ReactElement;
}

//I took this function from Radix source code
// https://github.com/radix-ui/primitives/blob/main/packages/react/focus-scope/src/FocusScope.tsx#L207-L233

function hasFocusableElements(container: HTMLElement) {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: any) => {
      const isHiddenInput = node.tagName === 'INPUT' && node.type === 'hidden';
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });
  const node = walker.nextNode();
  return !!node;
}

export function DialogLayout({ children, className }: DialogLayoutProps) {
  const { isOpen, handleClose, dialogRef } = useDialogContext();
  const overlayRef = useAriaHidden();

  const isFocusTrapActive = useMemo<boolean>(() => {
    return !!(dialogRef && hasFocusableElements(dialogRef));
  }, [dialogRef]);

  const handleClickEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose(event);
      }
    },
    [handleClose]
  );

  const handleClickOutside = useCallback(
    (event: Event) => {
      if (dialogRef && !dialogRef.contains(event.target as Node)) {
        handleClose(event);
      }
    },
    [dialogRef, handleClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleClickEsc, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleClickEsc, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickEsc, handleClickOutside]);

  useEffect(() => {
    if (children.type !== Dialog.Content) {
      throw new Error(
        `Dialog.Layout only supports a single Dialog.Content child`
      );
    }
  }, [children]);

  if (!isOpen) return null;

  return (
    <FocusTrap active={isFocusTrapActive}>
      <div
        ref={overlayRef}
        className={className ? className : 'dialog-overlay'}
      >
        {children}
      </div>
    </FocusTrap>
  );
}
