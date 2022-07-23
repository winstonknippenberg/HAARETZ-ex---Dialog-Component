import { PropsWithChildren } from 'react';
import { useDialogContext } from '../context/DialogContext';

interface DialogContentProps {
  documentClassName?: string;
  dialogClassName?: string;
}

export function DialogContent({
  children,
  documentClassName,
  dialogClassName,
}: PropsWithChildren<DialogContentProps>) {
  const { setDialogRef } = useDialogContext();

  return (
    <dialog
      className={dialogClassName ? dialogClassName : 'dialog'}
      ref={setDialogRef}
      open={true}
    >
      <div role="document" className={documentClassName}>
        {children}
      </div>
    </dialog>
  );
}
