import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { columnNameType } from '../types';
import api from '../config/axios.config';

export const useUpdateTaskColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, newColumn }: { id: string; newColumn: columnNameType }) => {
      const response = await api.patch(`/tasks/${id}`, { column: newColumn });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};