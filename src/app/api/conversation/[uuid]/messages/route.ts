import { getAccessToken } from "@auth0/nextjs-auth0";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CONVERSATIONS_ENDPOINT = `${process.env.BACKEND_API_URL}/conversations`;

const push = async (
  req: NextRequest,
  reader: ReadableStreamDefaultReader,
  controller: ReadableStreamDefaultController,
) => {
  const { done, value } = await reader.read();

  if (done) {
    controller.close();
    return;
  }

  controller.enqueue(new TextDecoder().decode(value));
  push(req, reader, controller);
};

export const POST = async (
  req: NextRequest,
  { params: { uuid } }: { params: { uuid: string } },
) => {
  const { accessToken } = await getAccessToken();
  const body = await req.json();
  const url = `${CONVERSATIONS_ENDPOINT}/${uuid}/messages`;

  const stream = new ReadableStream({
    async start(controller) {
      const fetchOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      const response = await fetch(url, fetchOptions);
      const reader = response.body?.getReader();

      if (reader) {
        push(req, reader, controller);
      }

      req.signal.addEventListener("abort", () => {
        if (reader) {
          reader.cancel();
        }
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};
