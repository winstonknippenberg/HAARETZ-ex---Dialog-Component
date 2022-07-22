import { useState, createContext, useContext } from 'react';
import { useCallbackRef } from 'use-callback-ref';

interface DialogContextType {
  dialogRef: HTMLDialogElement | null;
  setDialogRef: React.MutableRefObject<HTMLDialogElement | null> | null;
  isOpen: boolean | null;
  handleClose: Function;
}

export const DialogContext = createContext<DialogContextType | null>(null);

export const DialogContextProvider = ({
  children,
  isOpen,
  handleClose,
}: any) => {
  const [_, forceUpdate] = useState();
  const [dialogRef, _setRef] = useState<HTMLDialogElement | null>();
  const setDialogRef = useCallbackRef<HTMLDialogElement>(
    null,
    (newDialogRef) => {
      _setRef(newDialogRef);
      forceUpdate(undefined);
    }
  );

  return (
    <DialogContext.Provider
      value={{ dialogRef, setDialogRef, isOpen, handleClose }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  console.log({ context });
  if (!context) {
    throw new Error(
      `Inner parts of Dialog component cannot be used outside of Dialog`
    );
  }
  return context;
};
