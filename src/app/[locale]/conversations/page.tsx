import ConversationsTable, {
  TableSkeleton,
} from "@/components/conversation/ConversationsTable";
import { CreateConversationButton } from "@/components/conversation/CreateConversationButton";
import type { PageParams } from "@/types/utils";
import { Container, Stack } from "@mui/material";
import { unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

const ConversationsPage = ({
  params: { locale },
}: PageParams<{ locale: string }>) => {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <Container sx={{ pt: 8 }}>
      <Stack useFlexGap gap={4}>
        <CreateConversationButton />
        <Suspense fallback={<TableSkeleton />}>
          <ConversationsTable />
        </Suspense>
      </Stack>
    </Container>
  );
};

export default ConversationsPage;
