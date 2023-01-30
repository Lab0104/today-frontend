import { rest } from "msw";
import { meetingList } from "../components/MeetingCard/meetingList";

export const handlers = [
  rest.get("/meetings/editor", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        meetingList,
      })
    );
  }),
  rest.get("/meetings/advertisement", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        meetingList: [...meetingList, ...meetingList],
      })
    );
  }),
];
