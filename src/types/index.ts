
export type columnNameType= 'backlog'|'in_progress'|'review'|'done'

export interface ITaskType {
      id: string,
      title: string,
      description: string,
      column: columnNameType
    }
export interface IColumnType {
      columnName: columnNameType,
      tasks: ITaskType[]
    }
export interface ITaskResponse {
  data:ITaskType[],
  first:number;
  last:number;
  items:number;
  prev:number|null;
  next:number|null;
    }

    