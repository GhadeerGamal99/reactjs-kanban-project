export type columnNameType = "backlog" | "in_progress" | "in_review" | "done";
export type taskPeriorityType = "HIGH" | "LOW" | "MEDIUM";

export interface ITaskType {
  id: string;
  title: string;
  description?: string;
  priority: taskPeriorityType;
  column: columnNameType;
}
export interface IColumnType {
  columnName: columnNameType;
  tasks: ITaskType[];
}
export interface ITaskResponse {
  data: ITaskType[];
  first: number;
  last: number;
  items: number;
  prev: number | null;
  next: number | null;
}
export interface DragItem {
    id: string;
    newColumn: columnNameType
}