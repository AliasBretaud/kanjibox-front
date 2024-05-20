import { useCallback, useEffect, useReducer } from "react";
import type { $Message } from "@/types/models";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { getConversationMessages } from "@/lib/actions/conversation";

type State = {
  messages: $Message[] | null;
  isLoading: boolean;
};

type Action =
  | { type: "SET_MESSAGES"; payload: $Message[] }
  | { type: "ADD_MESSAGE"; payload: $Message }
  | { type: "LOADING_ON" }
  | { type: "LOADING_OFF" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_MESSAGE": {
      const messages = state.messages || [];
      return { ...state, messages: [...messages, action.payload] };
    }
    case "LOADING_ON":
      return { ...state, isLoading: true };
    case "LOADING_OFF":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const useConversation = (sessionId: string) => {
  const [{ messages, isLoading }, dispatch] = useReducer(reducer, {
    messages: null,
    isLoading: false,
  });

  useEffect(() => {
    if (!messages?.length) {
      dispatch({ type: "LOADING_ON" });
      const init = async () => {
        const history = await getConversationMessages(sessionId);
        if (history.length) {
          dispatch({ type: "SET_MESSAGES", payload: history });
        }
        dispatch({ type: "LOADING_OFF" });
      };
      init();
    }
  }, [messages?.length, sessionId]);

  const sendMessage = useCallback(
    async (message: string) => {
      dispatch({ type: "LOADING_ON" });
      await fetchEventSource(`/api/conversation/${sessionId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
        onmessage: (event) => {
          const newMessage = JSON.parse(event.data) as $Message;
          dispatch({ type: "ADD_MESSAGE", payload: newMessage });
        },
        onerror: (err) => {
          console.error("EventSource error:", err);
          dispatch({ type: "LOADING_OFF" });
        },
        onclose: () => {
          dispatch({ type: "LOADING_OFF" });
        },
      });
    },
    [sessionId],
  );

  return {
    isLoading,
    messages,
    sendMessage,
  };
};

export default useConversation;
