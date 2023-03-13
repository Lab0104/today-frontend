import { rest } from "msw";
import { meetingList } from "../components/MeetingCard/meetingList";

export const handlers = [
  rest.get("/meetings", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          title: "Editor's Pick",
          list: [...meetingList],
        },
        {
          title: "광고 탭",
          list: [...meetingList, ...meetingList],
        },
        {
          title: "이런 모임은 어때요?",
          list: [...meetingList, ...meetingList, ...meetingList],
        },
      ])
    );
  }),
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
  rest.get("/meetings/recommendation", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        meetingList: [
          ...meetingList,
          ...meetingList,
          ...meetingList,
          ...meetingList,
        ],
      })
    );
  }),
];
