import React, { useContext, useState } from "react";
import { classNames } from "../utils/classNames";
import { UiButton } from "../components/ui";

type ModalBody = JSX.Element | JSX.Element[] | string | null;
type ModalType = "loader" | "alert" | "confirm";

interface IModalCtx {
  show: (
    type: ModalType,
    body: ModalBody,
    onAccept?: () => void,
    onCancel?: () => void
  ) => void;
}

const modalCtx = React.createContext<IModalCtx>({
  show: () => {},
});

export interface IModalProviderProps {
  children: JSX.Element | JSX.Element[];
}

export function ModalProvider(props: IModalProviderProps) {
  const { children } = props;
  const [isVisible, setVisible] = useState(false);
  const [type, setType] = useState<ModalType>("alert");
  const [body, setBody] = useState<JSX.Element | JSX.Element[] | string | null>(
    null
  );

  const [acceptCb, setAcceptCb] = useState<undefined | (() => void)>();
  const [cancelCb, setCancelCb] = useState<undefined | (() => void)>();

  function handleShow(
    type: ModalType,
    body: ModalBody,
    onAccept?: () => void,
    onCancel?: () => void
  ) {
    setType(type);
    setBody(body);
    setVisible(true);

    setAcceptCb(() => onAccept);
    setCancelCb(() => onCancel);
  }

  function handleCancel() {
    setVisible(false);
    cancelCb && cancelCb();
  }

  function handleAccept() {
    setVisible(false);
    acceptCb && acceptCb();
  }

  return (
    <modalCtx.Provider value={{ show: handleShow }}>
      {children}
      {renderModalDialogContainer({
        type,
        isVisible,
        body,
        cancel: handleCancel,
        accept: handleAccept,
      })}
    </modalCtx.Provider>
  );
}

interface IModalDialogContainerProps {
  type: ModalType;
  isVisible: boolean;
  body: ModalBody;
  cancel: () => void;
  accept: () => void;
}

function renderModalDialogContainer(props: IModalDialogContainerProps) {
  const { type, isVisible, body, cancel, accept } = props;
  const containerClassName = classNames({
    "modal-dialog-container": true,
    "modal-dialog-container__isLoader": type === "loader",
    "modal-dialog-container__isAlert": type === "alert",
    "modal-dialog-container__isConfirm": type === "confirm",
  });
  const buttonsToShow = {
    cancel: ["confirm"].includes(type),
    accept: ["alert", "confirm"].includes(type),
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={containerClassName}>
      <div className="modal-dialog-container__backdrop"></div>
      <div className="modal-dialog-container__box">
        <div className="modal-dialog-container__body">{body}</div>

        <div className="modal-dialog-container__buttons">
          <UiButton visible={buttonsToShow.cancel} onClick={cancel}>
            Cancel
          </UiButton>
          <UiButton visible={buttonsToShow.accept} onClick={accept}>
            Accept
          </UiButton>
        </div>
      </div>
    </div>
  );
}

export function useModal() {
  return useContext(modalCtx);
}
