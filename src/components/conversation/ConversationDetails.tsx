"use client";

import useConversation from "@/hooks/useConversation";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useState } from "react";

export const ConversationDetails = ({ sessionId }: { sessionId: string }) => {
  const [messageInput, setMessageInput] = useState("");
  const { messages, isLoading, sendMessage } = useConversation(sessionId);

  const messageInputBox = (
    <>
      <TextField
        onChange={(evt) => setMessageInput(evt.target.value)}
        value={messageInput}
        disabled={isLoading}
      />
      <LoadingButton
        onClick={() => sendMessage(messageInput)}
        loading={isLoading}
      >
        Send
      </LoadingButton>
    </>
  );

  return (
    <>
      <Container sx={{ pt: 40 }}>
        <Typography>{sessionId}</Typography>
        {messages?.map((m) => <Typography key={m.id}>{m.message}</Typography>)}
        <Box sx={{ mt: 20 }}>
          {messages?.length && messageInputBox}
          {!messages && !isLoading && (
            <Button onClick={() => sendMessage("START")}>Start</Button>
          )}
        </Box>
      </Container>
      <SnackbarProvider />
    </>
  );
};
