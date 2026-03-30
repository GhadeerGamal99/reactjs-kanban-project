import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { ITaskType } from "../types";
import toast from "react-hot-toast";

export const useAddTask = () => {
  const queryClint = useQueryClient();
  return useMutation({
    mutationFn: (newTask: ITaskType) => {
      return axios.post("/tasks", newTask);
    },
    onSuccess: () => {
      queryClint.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Successfully Add Task!", {
        duration: 4000,
        position: "top-center",
      });
    },
    onError: (arr) => {
      toast.error("Something went wrong!" + arr.message);
    },
  });
};
