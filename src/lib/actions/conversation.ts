"use server";

import type { $Conversation, $Message } from "@/types/models";
import { get, post } from "./api";
import { handleApiCallError, handleApiResponse } from "@/lib/utils/apiUtils";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

const CONVERSATIONS_ENDPOINT = `${process.env.BACKEND_API_URL}/conversations`;
const MESSAGES_ENDPOINT = `${process.env.BACKEND_API_URL}/messages`;

export const getConversations = async () => {
  const res = await get(CONVERSATIONS_ENDPOINT, undefined, ["conversations"]);
  return (await res.json()) as $Conversation[];
};

export const getConversationMessages = async (sessionId: string) => {
  const res = await get(`${CONVERSATIONS_ENDPOINT}/${sessionId}/messages`);
  return (await res.json()) as $Message[];
};

export const createConversation = async (agent: string) => {
  const response = await post(CONVERSATIONS_ENDPOINT, { agent });
  const { id } = (await response.json()) as $Conversation;
  revalidateTag("conversations");
  redirect(`/conversations/${id}`);
};

export const getMessage = async (messageId: string) => {
  const res = await get(`${MESSAGES_ENDPOINT}/${messageId}`);
  return (await res.json()) as $Message;
};

export const sendMessage = async (sessionId: string, message: string) => {
  try {
    const response = await post(
      `${CONVERSATIONS_ENDPOINT}/${sessionId}/messages`,
      {
        message,
      },
    );
    return await handleApiResponse(response, undefined, ["messages"]);
  } catch (error) {
    return handleApiCallError(error);
  }
};
