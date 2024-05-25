import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { $Message } from "@/types/models";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { getConversationMessages } from "@/lib/actions/conversation";

type State = {
  isLoading: boolean;
  messages?: $Message[];
};

type Action =
  | { type: "SET_MESSAGES"; payload?: $Message[] }
  | { type: "ADD_MESSAGE"; payload: $Message }
  | { type: "LOADING_ON" }
  | { type: "LOADING_OFF" }
  | ((state: State) => State);

const reducer = (state: State, action: Action): State => {
  if (typeof action === "function") {
    return action(state);
  }

  switch (action.type) {
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_MESSAGE": {
      const messages = state.messages || [];
      return {
        ...state,
        messages: [...messages, action.payload],
      };
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
    isLoading: false,
  });
  const controller = useMemo(() => new AbortController(), []);
  const { signal } = controller;
  const closeConnection = useCallback(() => controller.abort(), [controller]);

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

  useEffect(() => () => closeConnection(), [closeConnection]);

  const sendMessage = useCallback(
    async (message: string) => {
      dispatch({ type: "LOADING_ON" });
      try {
        await fetchEventSource(`/api/conversation/${sessionId}/messages`, {
          signal,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
          onmessage: ({ event, data }) => {
            switch (event) {
              case "USER_MESSAGE": {
                const newMessage = JSON.parse(data) as $Message;
                dispatch({ type: "ADD_MESSAGE", payload: newMessage });
                closeConnection();
                break;
              }
              case "ASSISTANT_MESSAGE_DELTA": {
                dispatch((prevState) => {
                  const messagesUpdate = [...(prevState.messages || [])];
                  const lastMessageIdx = messagesUpdate.findLastIndex(
                    (m) => m.isGenerating,
                  );
                  const lastMessage = messagesUpdate?.[lastMessageIdx];
                  const newMessage = {
                    message: (lastMessage?.message || "") + data,
                    isGenerating: true,
                  } as $Message;
                  if (lastMessage) {
                    messagesUpdate.splice(lastMessageIdx, 1, newMessage);
                  } else {
                    messagesUpdate.push(newMessage);
                  }
                  return {
                    ...prevState,
                    messages: messagesUpdate,
                  };
                });
                break;
              }
              case "ASSISTANT_MESSAGE": {
                dispatch((prevState) => ({
                  ...prevState,
                  messages: prevState.messages?.map((m) => ({
                    ...m,
                    isGenerating: false,
                  })),
                }));
              }
            }
          },
          onerror: (err) => {
            console.error("EventSource error:", err);
            dispatch({ type: "LOADING_OFF" });
            closeConnection();
          },
          onclose: () => {
            dispatch({ type: "LOADING_OFF" });
            closeConnection();
          },
        });
      } catch (e) {
        console.error(e);
        closeConnection();
      }
    },
    [closeConnection, sessionId, signal],
  );

  return {
    isLoading,
    messages,
    sendMessage,
  };
};

export default useConversation;
