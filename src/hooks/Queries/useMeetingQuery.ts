import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { UseQueryResult } from "react-query/types/react/types";

export const meetingApi = async (id?: string) => {
  const res = await axios.get("/api/meetings", {
    params: { user_id: id },
  });
  return res.data;
};

export const useMeetingQuery = <T>(
  id?: string
): UseQueryResult<AxiosResponse<T>, Error> =>
  useQuery(["meeting", id || ""], async () => await meetingApi(id));
