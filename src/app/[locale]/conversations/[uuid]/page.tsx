import { ConversationDetails } from "@/components/conversation/ConversationDetails";
import type { PageParams } from "@/types/utils";

const ConversationPage = ({
  params: { uuid },
}: PageParams<{ uuid: string }>) => {
  return <ConversationDetails sessionId={uuid} />;
};

export default ConversationPage;
