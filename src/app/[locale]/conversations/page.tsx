import ConversationsTable, {
  TableSkeleton,
} from "@/components/conversation/ConversationsTable";
import { CreateConversationButton } from "@/components/conversation/CreateConversationButton";
import { Container, Stack } from "@mui/material";
import { Suspense } from "react";

const ConversationsPage = () => (
  <Container sx={{ pt: 8 }}>
    <Stack useFlexGap gap={4}>
      <CreateConversationButton />
      <Suspense fallback={<TableSkeleton />}>
        <ConversationsTable />
      </Suspense>
    </Stack>
  </Container>
);

export default ConversationsPage;
