import type { FormState } from "@/types";
import { enqueueSnackbar } from "notistack";
import { useCallback } from "react";

const useNotification = () => {
  const showFormActionNotif = useCallback(
    (
      formState: FormState,
      successMessage = "Success",
      errorMessage = "Error",
    ) => {
      if (formState?.isSuccess) {
        enqueueSnackbar(successMessage, { variant: "success" });
      } else if (formState?.isError) {
        enqueueSnackbar(errorMessage, { variant: "error" });
      }
    },
    [],
  );

  return { showFormActionNotif };
};

export default useNotification;
