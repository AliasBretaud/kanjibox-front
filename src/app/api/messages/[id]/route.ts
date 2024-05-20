import { getMessage } from "@/lib/actions/conversation";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  const message = await getMessage(params.id);
  return NextResponse.json(message, { status: 200 });
};
