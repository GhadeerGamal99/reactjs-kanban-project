import {
  useInfiniteQuery,
  type InfiniteData,
} from "@tanstack/react-query";
import axios from "axios";
import type { columnNameType, ITaskResponse } from "../types";

export const useGetTaskByCol = (columnName: columnNameType,searchTerm:string="") => {
  return useInfiniteQuery<ITaskResponse,Error,InfiniteData<ITaskResponse>>({
    queryKey: ["tasks", columnName,searchTerm],
    queryFn: async ({ pageParam = 1}) => {
      const response = await axios.get(
        `http://localhost:4000/tasks?column=${columnName}&title_contains=${searchTerm}&_page=${pageParam}&_per_page=5`,
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  });
};
