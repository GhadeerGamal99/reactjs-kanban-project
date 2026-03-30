import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ITaskType } from "../types";
import api from "../config/axios.config";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedTask: ITaskType) => {
      return api.patch(`/tasks/${updatedTask.id}`, updatedTask);
    },
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<ITaskType[]>(["tasks"]);
      queryClient.setQueryData(["tasks"], (old: ITaskType[] | undefined) => {
        return old?.map((item) =>
          item.id === updatedTask.id ? updatedTask : item,
        );
      });
      return { previousTasks };
    },
    onError: (arr, _, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
      toast.error("Something went wrong!" + arr.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Successfully update Task!", {
        duration: 4000,
        position: "top-center",
      });
    },
  });
};
