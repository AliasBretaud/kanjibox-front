"use client";

import { createConversation } from "@/lib/actions/conversation";
import { Button } from "@mui/material";

export const CreateConversationButton = () => {
  return (
    <Button onClick={() => createConversation("RESTAURANT")}>
      New Conversation
    </Button>
  );
};
