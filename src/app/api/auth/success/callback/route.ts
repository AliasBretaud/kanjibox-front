import { post } from "@/lib/actions/api";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

const USERS_ENDPOINT = `${process.env.BACKEND_API_URL}/users`;

export async function GET() {
  const { accessToken } = await getAccessToken();
  if (accessToken) {
    await post(USERS_ENDPOINT, undefined);
  } else {
    throw new Error("Invalid session");
  }
  redirect("/");
}
