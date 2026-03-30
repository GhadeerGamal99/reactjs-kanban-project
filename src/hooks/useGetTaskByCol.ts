import {
  useInfiniteQuery,
} from "@tanstack/react-query";
import type { columnNameType, ITaskType } from "../types";
import api from "../config/axios.config";

export const useGetTaskByCol = (columnName: columnNameType, searchTerm: string = "") => {
  return useInfiniteQuery<ITaskType[], Error>({
    queryKey: ["tasks", columnName, searchTerm],
    queryFn: async ({ pageParam = 1 }) => {
   
      const response = await api.get('/tasks'); 
      const allTasks: ITaskType[] = response.data;


      const filteredTasks = allTasks.filter(task => {
        const matchesColumn = task.column === columnName;
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesColumn && matchesSearch;
      });

  
      const limit = 5;
      const startIndex = ((pageParam as number) - 1) * limit;
      return filteredTasks.slice(startIndex, startIndex + limit);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 5 ? allPages.length + 1 : undefined;
    },
  });
};