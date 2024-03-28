import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

const useLoadUrlParams = () => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const loadParams = useCallback(
    (params: Record<string, string>) => {
      const urlParams = new URLSearchParams(params);
      for (const p of Object.keys(params)) {
        const val = params[p];
        if (val) {
          urlParams.set(p, val);
        } else {
          urlParams.delete(p);
        }
      }
      replace(`${pathname}?${urlParams.toString()}`);
    },
    [pathname, replace],
  );

  return loadParams;
};

export default useLoadUrlParams;
