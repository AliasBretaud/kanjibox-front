import { ConversationDetails } from "@/components/conversation/ConversationDetails";
import type { PageParams } from "@/types/utils";
import { unstable_setRequestLocale } from "next-intl/server";

const ConversationPage = ({
  params: { locale, uuid },
}: PageParams<{ locale: string; uuid: string }>) => {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  return <ConversationDetails sessionId={uuid} />;
};

export default ConversationPage;
