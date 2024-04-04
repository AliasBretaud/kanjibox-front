import { enqueueSnackbar } from "notistack";
import { useCallback } from "react";

const useNotification = () => {
  const showSuccessNotif = useCallback(
    (message = "Success") => enqueueSnackbar(message, { variant: "success" }),
    [],
  );

  const showErrorNotif = useCallback(
    (message = "Error") => enqueueSnackbar(message, { variant: "error" }),
    [],
  );

  return { showSuccessNotif, showErrorNotif };
};

export default useNotification;
