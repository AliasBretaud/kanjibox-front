import { getConversations } from "@/lib/actions/conversation";
import {
  Button,
  Container,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import type { $Conversation } from "@/types/models";
import { formatDistanceToNow, parseISO } from "date-fns";
import { enUS, fr, ja } from "date-fns/locale";
import { getLocale } from "next-intl/server";
import Link from "next/link";

const createData = (
  { id, lastUpdate, agent, status }: $Conversation,
  locale: string,
) => {
  const lang = (() => {
    switch (locale) {
      case "ja":
        return ja;
      case "fr":
        return fr;
      default:
        return enUS;
    }
  })();
  const formatedDate = formatDistanceToNow(lastUpdate, {
    locale: lang,
    addSuffix: true,
  });
  return { date: formatedDate, type: agent, description: "", status, id };
};

const TableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell>Date</TableCell>
      <TableCell>Type</TableCell>
      <TableCell>Description</TableCell>
      <TableCell>Status</TableCell>
      <TableCell />
    </TableRow>
  </TableHead>
);

export const TableSkeleton = () => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHeader />
    </Table>
    <LinearProgress />
    <Container sx={{ py: 4, display: "flex", justifyContent: "center" }}>
      <Typography>Loading...</Typography>
    </Container>
  </TableContainer>
);

const EmptyState = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeader />
      </Table>
      <Container sx={{ py: 4, display: "flex", justifyContent: "center" }}>
        <Typography>No conversations yet</Typography>
      </Container>
    </TableContainer>
  );
};

export const ConversationsTable = async () => {
  const locale = await getLocale();
  const sessions = await getConversations();
  sessions.sort(
    (a, b) =>
      parseISO(b.lastUpdate).getTime() - parseISO(a.lastUpdate).getTime(),
  );
  const rows = sessions.map((c) => createData(c, locale));
  return rows.length > 0 ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeader />
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell>
                <RestaurantIcon />
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <Link href={`/conversations/${row.id}`}>
                  <Button>Open</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <EmptyState />
  );
};
export default ConversationsTable;
