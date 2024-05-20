"use client";

import useConversation from "@/hooks/useConversation";
import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useState } from "react";

export const ConversationDetails = ({ sessionId }: { sessionId: string }) => {
  const [messageInput, setMessageInput] = useState("");
  const { messages, isLoading, sendMessage } = useConversation(sessionId);

  return (
    <>
      <Container sx={{ pt: 40 }}>
        <Typography>{sessionId}</Typography>
        {messages.map((m) => (
          <Typography key={m.id}>{m.message}</Typography>
        ))}
        <Box sx={{ mt: 20 }}>
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
        </Box>
      </Container>
      <SnackbarProvider />
    </>
  );
};
