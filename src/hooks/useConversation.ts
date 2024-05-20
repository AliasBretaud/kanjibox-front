import type { Dispatch } from "react";
import { useCallback, useEffect, useReducer, useTransition } from "react";
import type { $Message } from "@/types/models";
import {
  getConversationMessages,
  sendMessage as sendMessageAction,
} from "@/lib/actions/conversation";

type State = {
  messages: $Message[];
};

type Action =
  | { type: "SET_MESSAGES"; payload: $Message[] }
  | { type: "ADD_MESSAGE"; payload: $Message };

const getMessage = async (messageId: number): Promise<$Message> =>
  fetch(`/api/messages/${messageId}`).then((res) => res.json());

const refreshHistory = async (
  sessionId: string,
  dispatch: Dispatch<Action>,
) => {
  const fetchData = async () => {
    const history = await getConversationMessages(sessionId);
    if (history?.length && !history.some(({ isGenerating }) => isGenerating)) {
      dispatch({ type: "SET_MESSAGES", payload: history });
      clearInterval(interval);
    }
  };
  const interval = setInterval(fetchData, 1000);
};

const refreshMessage = async (
  messageId: number,
  dispatch: Dispatch<Action>,
) => {
  const fetchData = async () => {
    const message = await getMessage(messageId);
    if (message.isGenerating === false) {
      dispatch({ type: "ADD_MESSAGE", payload: message });
      clearInterval(interval);
    }
  };
  const interval = setInterval(fetchData, 1000);
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

const useConversation = (sessionId: string) => {
  const [{ messages }, dispatch] = useReducer(reducer, {
    messages: [],
  });
  const [isPending, startTransition] = useTransition();
  const isLoading =
    isPending ||
    !messages.length ||
    !messages[messages.length - 1].isAppMessage;

  useEffect(() => {
    if (!messages?.length) {
      refreshHistory(sessionId, dispatch);
    }
  }, [messages?.length, sessionId]);

  const sendMessage = useCallback(
    (text: string) => {
      startTransition(async () => {
        const message = (await sendMessageAction(sessionId, text)).apiResponse
          .data;
        dispatch({ type: "ADD_MESSAGE", payload: message });
        if (message.nextMessageId) {
          refreshMessage(message.nextMessageId, dispatch);
        }
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
