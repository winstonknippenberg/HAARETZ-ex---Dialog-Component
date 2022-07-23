import * as React from 'react';
import { useEffect } from 'react';
import ReactPortal from '../../ReactPortal/ReactPortal';

import './dialogStyles.css';
import { DialogContextProvider } from '../context/DialogContext';
import { DialogLayout } from './DialogLayout';
import { DialogContent } from './DialogContent';

interface DialogProps {
  isOpen: boolean;
  handleClose: Function;
  appendTo?: HTMLElement;
  children: React.ReactElement;
}

export default function Dialog({
  children,
  isOpen,
  handleClose,
  appendTo,
}: DialogProps) {
  useEffect(() => {
    if (children.type !== Dialog.Layout) {
      throw new Error(`Dialog only supports a single Dialog.Layout child`);
    }
  }, [children]);
  return (
    <DialogContextProvider isOpen={isOpen} handleClose={handleClose}>
      <ReactPortal container={appendTo}>{children}</ReactPortal>
    </DialogContextProvider>
  );
}

Dialog.Layout = DialogLayout;

Dialog.Content = DialogContent;
