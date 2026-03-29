import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITaskType } from "../../types";


interface kanbanState {
  tasks: ITaskType[];
}
const initialState: kanbanState = {
  tasks: [],
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<ITaskType[]>) => {
      state.tasks = action.payload;
    },
    reorderTasks: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>,
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const newTasks = [...state.tasks];
      const [removed] = newTasks.splice(dragIndex, 1);
      newTasks.splice(hoverIndex, 0, removed);
      state.tasks = newTasks;
      console.log("is it work dragIndex+ hoverIndex ",dragIndex,hoverIndex)
    },
  },
});
export const {  reorderTasks, setTasks } = kanbanSlice.actions;
export default kanbanSlice.reducer;
