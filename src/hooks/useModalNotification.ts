import { useCallback } from "react";
import useModal from "./useModal";
import useNotification from "./useNotification";

const useModalNotification = () => {
  const { hideModal } = useModal();
  const { showSuccessNotif, showErrorNotif } = useNotification();

  const closeModal = useCallback(() => hideModal(), [hideModal]);

  const showNotification = useCallback(
    (message: string, isError = false) => {
      if (isError) {
        showErrorNotif(message);
      } else {
        showSuccessNotif(message);
      }
    },
    [showErrorNotif, showSuccessNotif],
  );

  return { closeModal, showNotification };
};

export default useModalNotification;
