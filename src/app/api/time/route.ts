import { fetchTime } from "@/app/utils/fetch-time";

export async function GET() {
  const data = await fetchTime();

  return Response.json({ data });
}
