import type { columnNameType } from "../types";

export const getBullColumnColor = (columnName: columnNameType): string => {
    const colors: Record<columnNameType, string> = {
        in_review: '!bg-bg-inReview',
        backlog: '!bg-bg-toDo',
        in_progress: '!bg-bg-inProgress',
        done: '!bg-bg-done',
    };
    return colors[columnName] || '!bg-bg-done';
};

export const getStatusClassColor = (priority: string) => {
        switch (priority) {
            case 'HIGH': return '!bg-bg-high !text-text-high';
            case 'LOW': return '!bg-bg-low !text-text-low';
            default: return '!bg-bg-medium !text-text-medium';
        }
    };