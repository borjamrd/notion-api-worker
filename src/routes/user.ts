import { fetchNotionUsers } from "../notion-api/notion.js";
import { HandlerRequest } from "../notion-api/types.js";
import { getNotionToken } from "../utils/index.js";
import { createResponse } from "../utils/response.js";

export async function userRoute(c: HandlerRequest) {
  const userId = c.req.param("userId");

  if (!userId) {
    return createResponse(
      { error: 'missing required "userId"' },
      {
        headers: { "Content-Type": "application/json" },
        statusCode: 400,
        request: c,
      }
    );
  }

  const users = await fetchNotionUsers([userId], getNotionToken(c));

  return createResponse(users[0], { request: c });
}
