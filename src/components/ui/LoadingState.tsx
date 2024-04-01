import { CircularProgress } from "@mui/material";

export const LoadingState = ({ text }: { text: string }) => (
  <div className="w-full flex flex-col items-center p-6 gap-4">
    <p>{text}</p>
    <CircularProgress size={80} />
  </div>
);
