import { sendMessage } from "@/lib/actions/conversation";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { uuid: string } },
) => {
  const message = await req.text();
  return NextResponse.json(await sendMessage(params.uuid, message), {
    status: 200,
  });
};
