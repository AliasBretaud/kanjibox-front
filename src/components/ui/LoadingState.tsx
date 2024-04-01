import { CircularProgress, Container } from "@mui/material";

export const LoadingState = ({ text }: { text: string }) => (
  <Container
    maxWidth={false}
    sx={{
      height: "calc(100vh - 64px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: "100px",
    }}
  >
    <div className="flex flex-col items-center gap-4">
      <p>{text}</p>
      <CircularProgress size={80} />
    </div>
  </Container>
);
