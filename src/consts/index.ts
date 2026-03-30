import type { columnNameType, taskPeriorityType } from "../types";

export const PRIORITIES = ["HIGH", "LOW", "MEDIUM"] as taskPeriorityType[];
export const COLUMNS = [ 'backlog','in_progress','in_review','done'] as columnNameType[];