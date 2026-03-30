import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../config/axios.config";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId: string) => {
      return api.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Successfully delete Task!", {
        duration: 4000,
        position: "top-center",
      });
    },
    onError: (arr) => {
      toast.error("Something went wrong!" + arr.message);
    },
  });
};
