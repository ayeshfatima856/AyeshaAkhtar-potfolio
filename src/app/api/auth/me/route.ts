import { NextRequest } from "next/server";
import { getSessionFromReq, ok } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const session = getSessionFromReq(req);
  if (!session) return ok({ authenticated: false }, 200);
  return ok({
    authenticated: true,
    admin: { id: session.sub, email: session.email, name: session.name },
  });
}
