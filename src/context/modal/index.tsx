import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

import { Modal } from '@/components';
import { noop } from '@/helpers';
import { FCC } from '@/types';

type ButtonType =
  | 'primary'
  | 'warning'
  | 'danger'
  | 'outline-primary'
  | 'outline-warning'
  | 'outline-danger';

export type ActionButton = {
  onClick: () => void;
  type?: ButtonType;
  label: string;
};

export type ModalProps = {
  header: JSX.Element | string | null;
  body: JSX.Element | string | null;
  actionButton?: ActionButton;
  size?: 'md' | 'lg' | 'xl';
};

type IModalContextState = {
  primaryModal: ModalProps;
  secondaryModal: ModalProps;
};

type IModalContext = {
  showModal: (modalProps: ModalProps) => void;
  hideModal: () => void;
};

const initModalContext: IModalContext = {
  showModal: noop,
  hideModal: noop,
};

const ModalContext = createContext(initModalContext);

const initModalContent: ModalProps = {
  actionButton: { label: '', type: 'primary', onClick: noop },
  header: null,
  body: null,
};

const initModalState: IModalContextState = {
  primaryModal: initModalContent,
  secondaryModal: initModalContent,
};

export const ModalProvider: FCC = ({ children }) => {
  const [modalState, setModalState] = useState(initModalState);

  const showPrimaryModalRef = useRef<HTMLButtonElement>(null);
  const showSecondaryModalRef = useRef<HTMLButtonElement>(null);

  const closePrimaryModalRef = useRef<HTMLButtonElement>(null);
  const closeSecondaryModalRef = useRef<HTMLButtonElement>(null);

  const showPrimaryModal = useCallback(() => {
    showPrimaryModalRef.current?.click();
  }, []);

  const showSecondaryModal = useCallback(() => {
    showSecondaryModalRef.current?.click();
  }, []);

  const hideModal = useCallback(() => {
    closePrimaryModalRef.current?.click();
    closeSecondaryModalRef.current?.click();

    // timeout bcs of the closing animation
    setTimeout(() => {
      setModalState(initModalState);
    }, 300);
  }, []);

  const resetPrimaryModal = useCallback(
    () =>
      setTimeout(
        () =>
          setModalState(({ secondaryModal }) => ({
            primaryModal: initModalContent,
            secondaryModal,
          })),
        300
      ),
    []
  );

  const value = useMemo(
    () => ({
      showModal: (modalProps: ModalProps) =>
        setModalState(({ primaryModal }) => {
          if (primaryModal === initModalContent) {
            showPrimaryModal();
            return { primaryModal: modalProps, secondaryModal: initModalContent };
          }

          resetPrimaryModal();
          showSecondaryModal();
          return { primaryModal, secondaryModal: modalProps };
        }),

      hideModal,
    }),
    [showPrimaryModal, showSecondaryModal, resetPrimaryModal, hideModal]
  );

  return (
    <ModalContext.Provider value={value}>
      <Modal
        {...modalState}
        hideModal={hideModal}
        actionRef={{
          showPrimaryModalRef,
          showSecondaryModalRef,
          closePrimaryModalRef,
          closeSecondaryModalRef,
        }}
      />
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
