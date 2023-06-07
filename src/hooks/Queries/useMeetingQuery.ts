import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { UseQueryResult } from "react-query/types/react/types";

export const meetingApi = async (id?: string) => {
  if (id) {
    const idResponse = await axios.get("/api/meetings", {
      params: { user_id: id },
    });
    return idResponse.data;
  }
  const response = await axios.get("/api/meetings");
  return response.data;
};

export const useMeetingQuery = <T>(
  id?: string
): UseQueryResult<AxiosResponse<T>, Error> =>
  useQuery(
    id ? ["meeting", id] : ["meeting"],
    async () => await meetingApi(id)
  );
