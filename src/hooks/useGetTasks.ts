import { useQuery } from "@tanstack/react-query";
import type { ITaskType } from "../types";
import api from "../config/axios.config";


export const useGetTasks = () => {
  return useQuery<ITaskType[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.get("/tasks");
      return response.data;
    },
  });
};
